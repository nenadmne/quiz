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
let question = null;
let numberOfQuestions = 0;
const timers = new Map();
let fetchedUsers = [];

function startTimer(room) {
  let timer = 15;
  timers.set(room, timer);
  const interval = setInterval(() => {
    timer--;
    timers.set(room, timer);
    // Emit the updated timer value to the clients
    io.to(room).emit("updateTimer", timer);
    if (timer === 0) {
      clearInterval(interval);
    }
  }, 1000);
}

io.on("connection", (socket) => {
  socket.on("join", (playerName) => {
    console.log(`79: ${playerName} joined`);
    const player = { id: socket.id, name: playerName, score: 0 };
    for (const [roomId, players] of playerRooms.entries()) {
      if (players.length < 2) {
        room = roomId;
        break;
      }
    }
    if (!room || playerRooms.get(room) === undefined) {
      room = socket.id; // Use socket ID as room ID
      console.log(`89: New room created: ${room}`);
      playerRooms.set(room, []);
    }
    if (playerRooms.get(room).length >= 2) {
      room = socket.id; // If room is full, create new room
      console.log(`94: New room created: ${room}`);
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
      if (numberOfQuestions < 6 && players !== undefined && fetchedUsers.length === 2) {
        io.to(room).emit("question", randomQuestion, numberOfQuestions);
        answers = [];
        startTimer(room);
        question = randomQuestion;
      }
      console.log(`115: Question number ${numberOfQuestions}`);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  });

  socket.on("submitAnswer", ({ selectedAnswer, username }) => {
    let playerToUpdate;
    let updatedPlayers;
    answers.push({ username: username, selectedAnswer: selectedAnswer });
    for (const [roomId, players] of playerRooms.entries()) {
      playerToUpdate = players.find((player) => player.name === username);
      if (playerToUpdate) {
        break;
      }
    }
    if (selectedAnswer === question.correctAnswer) {
      playerToUpdate.score = +playerToUpdate.score + +question.points; // Increment score
    }
    for (const [roomId, players] of playerRooms.entries()) {
      updatedPlayers = players;
    }
    if (timers.get(room) === 0) {
      io.to(room).emit("updateScore", {
        players: updatedPlayers,
        answers: answers,
      });
    }
  });

  socket.on("chatMessage", (message) => {
    io.emit("chatMessage", message);
  });

  socket.on("connectedUsers", () => {
    const connectedUsers = io.engine.clientsCount;
    io.emit("connectedUsers", connectedUsers);
  });

  socket.on("activeRooms", () => {
    const activeRoomsCount = Array.from(playerRooms.keys()).length;
    console.log(`156: Active rooms = ${activeRoomsCount}`);
    io.emit("activeRooms", activeRoomsCount);
  });

  socket.on("gameStart", async (players) => {
    console.log(`161: Game started`);
    await addMatch(players, room);
  });

  socket.on("joinConfirm", async (user) => {
    fetchedUsers.push(user);
  });

  socket.on("gameOver", () => {
    io.to(room).emit("gameOver", room);
    playerRooms.delete(room);
    fetchedUsers = [];
    console.log(`173: Deleted Room ${room}`);
  });

  socket.on("disconnect", () => {
    console.log("177: A user disconnected");
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
        console.log(`200: Deleted room ${room}`);
      }
      io.to(room).emit("updatePlayers", playerRooms.get(room));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
