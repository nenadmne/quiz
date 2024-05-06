const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const cors = require("cors");

const users = require("./routes/users");
const games = require("./routes/games");
const leaderboards = require("./routes/leaderboards");
const userInfo = require("./routes/userInfo");
const gameOver = require("./routes/gameOver");
const { addMatch } = require("./util/addMatch");
const questions = require("./routes/questions");
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
    origin: [
      "http://localhost:5173",
      "https://admin.socket.io",
      "https://quiz-cyan-tau.vercel.app",
    ],
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
app.use(games);
app.use(leaderboards);
app.use(userInfo);
app.use(gameOver);
app.use(questions);

// Store the mapping of players to rooms
const playerRooms = new Map();
let room;
let answers = [];
let numberOfQuestions = 0;
let fetchers = [];

io.on("connection", (socket) => {
  socket.on("join", (playerName) => {
    console.log(`51: ${playerName} joined`);
    const player = { id: socket.id, name: playerName, score: 0 };
    for (const [roomId, players] of playerRooms.entries()) {
      if (players.length < 2) {
        room = roomId;
        break;
      }
    }
    if (!room || playerRooms.get(room) === undefined) {
      room = socket.id; // Use socket ID as room ID
      console.log(`61: New room created: ${room}`);
      playerRooms.set(room, []);
    }
    if (playerRooms.get(room).length >= 2) {
      room = socket.id; // If room is full, create new room
      console.log(`66: New room created: ${room}`);
      playerRooms.set(room, []);
    }

    playerRooms.get(room).push(player);
    socket.join(room); // Join the room here
    io.to(room).emit("updatePlayers", playerRooms.get(room));
    numberOfQuestions = 0;
  });

  socket.on("getQuestion", async () => {
    try {
      const players = playerRooms.get(room);
      const randomQuestion = await getRandomQuestion(room);
      numberOfQuestions++;
      if (
        numberOfQuestions < 6 &&
        numberOfQuestions > 1 &&
        players !== undefined && 
        fetchers.length === 2
      ) {
        io.to(room).emit("question", randomQuestion, numberOfQuestions);
        fetchers = [];
      }
      if (
        numberOfQuestions === 1 &&
        players !== undefined
      ) {
        io.to(room).emit("question", randomQuestion, numberOfQuestions);
        fetchers = [];
      }
      console.log(`84: Question number ${numberOfQuestions}`);
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
      fetchers.push(username);

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

  socket.on("activeRooms", () => {
    const activeRoomsCount = Array.from(playerRooms.keys()).length;
    console.log(`137: Active rooms = ${activeRoomsCount}`);
    io.emit("activeRooms", activeRoomsCount);
  });

  socket.on("gameStart", async (players) => {
    console.log(`129: Game started`);
    await addMatch(players, room);
  });

  socket.on("gameOver", () => {
    io.to(room).emit("gameOver", room);
    playerRooms.delete(room);
    console.log(`136: Deleted Room ${room}`);
  });

  socket.on("disconnect", () => {
    console.log("140: A user disconnected");
    // Reseting questions on user disconnection
    updateUsedQuestions();

    // Updating online users count in chat on every user disconection
    const connectedUsers = io.engine.clientsCount;
    io.emit("connectedUsers", connectedUsers);

    // Updating players after user left the game
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
      if (playerRooms.get(room).length === 0) {
        playerRooms.delete(room);
        console.log(`163: Deleted room ${room}`);
      }
      io.to(room).emit("updatePlayers", playerRooms.get(room));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
