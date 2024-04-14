const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const cors = require("cors");

const users = require("./routes/users");
const addQuestion = require("./routes/addQuestion");
const {
  getRandomQuestion,
  updateUsedQuestions,
} = require("./util/getQuestion");

const PORT = process.env.PORT || 4000;
const app = express();

// 1.step on creating io
const server = http.createServer(app);

// 2.step on creating io
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://admin.socket.io"],
    credentials: true,
  },
});

// 3. step creating admin panel
instrument(io, {
  auth: false,
  mode: "development",
});

app.use(cors());
app.use(bodyParser.json());
app.use(users);
app.use(addQuestion);

// Store the mapping of players to rooms
const playerRooms = new Map();
let room;
let answers = [];
let numberOfQuestions = 0;

io.on("connection", (socket) => {
  socket.on("join", (playerName) => {
    console.log(`${playerName} joined`);
    const player = { id: socket.id, name: playerName, score: 0 };
    for (const [roomId, players] of playerRooms.entries()) {
      if (players.length < 2) {
        room = roomId;
        break;
      }
    }
    if (!room) {
      room = socket.id; // Use socket ID as room ID
      console.log(`New room created: ${room}`);
      playerRooms.set(room, []);
    } else if (playerRooms.get(room).length >= 2) {
      room = socket.id; // If room is full, create new room
      console.log(`New room created: ${room}`);
      playerRooms.set(room, []);
    }

    playerRooms.get(room).push(player);
    socket.join(room); // Join the room here
    io.to(room).emit("updatePlayers", playerRooms.get(room));
    numberOfQuestions = 0;
  });

  socket.on("getQuestion", async () => {
    try {
      const randomQuestion = await getRandomQuestion(room);
      numberOfQuestions++;
      if (numberOfQuestions < 6) {
        io.to(room).emit("question", randomQuestion, numberOfQuestions);
      }
      console.log(numberOfQuestions);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  });

  socket.on(
    "submitAnswer",
    ({ selectedAnswer, username, isCorrectAnswer, points }) => {
      let playerToUpdate;
      let updatedPlayers;
      answers.push({ username: username, selectedAnswer: selectedAnswer });

      for (const [roomId, players] of playerRooms.entries()) {
        playerToUpdate = players.find((player) => player.name === username);
        if (playerToUpdate) {
          break;
        }
      }
      if (isCorrectAnswer) {
        playerToUpdate.score = +playerToUpdate.score + +points; // Increment score
      }
      for (const [roomId, players] of playerRooms.entries()) {
        updatedPlayers = players;
      }
      io.to(room).emit("updateScore", {
        players: updatedPlayers,
        answers: answers,
      });
      if (answers.length === 2) {
        answers = [];
      }
    }
  );

  socket.on("chatMessage", (message) => {
    io.emit("chatMessage", message);
  });

  socket.on("connectedUsers", () => {
    const connectedUsers = io.engine.clientsCount;
    io.emit("connectedUsers", connectedUsers);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    updateUsedQuestions();

    const connectedUsers = io.engine.clientsCount;
    io.emit("connectedUsers", connectedUsers);

    let room;
    for (const [roomId, players] of playerRooms.entries()) {
      if (players.some((player) => player.id === socket.id)) {
        room = roomId;
        break;
      }
    }

    if (room) {
      playerRooms.set(
        room,
        playerRooms.get(room).filter((player) => player.id !== socket.id)
      );
      io.to(room).emit("updatePlayers", playerRooms.get(room));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
