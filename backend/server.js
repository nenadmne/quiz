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
const timers = new Map();

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
    console.log(`76: ${playerName} joined`);
    const player = { id: socket.id, name: playerName, score:0};
    for (const [roomId, players] of playerRooms.entries()) {
      if (players.players.length < 2) {
        room = roomId;
        break;
      }
    }
    if (!room || playerRooms.get(room) === undefined) {
      room = socket.id; // Use socket ID as room ID
      console.log(`86: New room created: ${room}`);
      playerRooms.set(room, {
        players: [],
        numberOfQuestions: 0,
        question: null,
      });
    }
    if (playerRooms.get(room).length >= 2) {
      room = socket.id; // If room is full, create new room
      console.log(`95: New room created: ${room}`);
      playerRooms.set(room, {
        players: [],
        numberOfQuestions: 0,
        question:null
      });
    }
    const roomData = playerRooms.get(room);
    roomData.players.push(player);
    socket.join(room); // Join the room here
    io.to(room).emit("updatePlayers", roomData.players, room);
  });

  socket.on("getQuestion", async (roomId) => {
    try {
      const roomData = playerRooms.get(room);
      const players = roomData.players;
      const randomQuestion = await getRandomQuestion(roomId);
      roomData.numberOfQuestions++;
      if (roomData.numberOfQuestions < 6 && players !== undefined) {
        io.to(roomId).emit("question", randomQuestion, roomData.numberOfQuestions);
        answers = answers.filter(answer => answer.roomId !== roomId);
        startTimer(roomId);
        roomData.question = randomQuestion;
      }
      console.log(`120: Question number ${roomData.numberOfQuestions}`);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  });

  socket.on("submitAnswer", ({ selectedAnswer, username, roomId }) => {
    let playerToUpdate;
    let updatedPlayers;
    answers.push({
      roomId: roomId,
      username: username,
      selectedAnswer: selectedAnswer,
    });
    const roomData = playerRooms.get(roomId);
    playerToUpdate = roomData.players.find((player) => player.name === username);

    if (selectedAnswer === roomData.question.correctAnswer) {
      playerToUpdate.score = +playerToUpdate.score + +roomData.question.points; // Increment score
    }
    updatedPlayers = roomData.players;

    if (timers.get(roomId) === 0) {
      io.to(roomId).emit("updateScore", {
        players: updatedPlayers,
        answers: answers.filter((answer) => answer.roomId === roomId),
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
    console.log(`161: Active rooms = ${activeRoomsCount}`);
    io.emit("activeRooms", activeRoomsCount);
  });

  socket.on("gameStart", async (players, roomId) => {
    console.log(`166: Game started`);
    await addMatch(players, roomId);
  });

  socket.on("gameOver", (roomId) => {
    io.to(roomId).emit("gameOver", roomId);
    playerRooms.delete(roomId);
    console.log(`173: Deleted Room ${roomId}`);
  });

  socket.on("disconnect", () => {
    console.log("177: A user disconnected");
    // Reseting questions on user disconnection
    updateUsedQuestions();

    // Updating online users count in chat on every user disconection
    const connectedUsers = io.engine.clientsCount;
    io.emit("connectedUsers", connectedUsers);
    console.log(socket.id)
    // Updating players after user left the game
    let deletedRoom;
    for (const [roomId, playersObj] of playerRooms.entries()) {
      const foundPlayer = playersObj.players.find(player => player.id === socket.id);
      if (foundPlayer) {
        deletedRoom = roomId;
        break;
      }
    }
    if (deletedRoom) {
      const roomData = playerRooms.get(deletedRoom);
      roomData.players = roomData.players.filter((player) => player.id !== socket.id)
      if (roomData.players.length === 0) {
        playerRooms.delete(deletedRoom);
        console.log(`199: Deleted room ${deletedRoom}`);
      }
      io.to(deletedRoom).emit("updatePlayers", roomData.players, deletedRoom);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
