const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const cors = require("cors");

const users = require("./routes/users");
const addQuestion = require("./routes/addQuestion");
const { getRandomQuestion } = require("./util/getQuestion");
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

io.on("connection", (socket) => {
  socket.on("join", (playerName) => {
    const player = { id: socket.id, name: playerName, score: 0 };
    for (const [roomId, players] of playerRooms.entries()) {
      if (players.length < 2) {
        room = roomId;
        break;
      }
    }
    if (!room) {
      room = socket.id; // Use socket ID as room ID
      playerRooms.set(room, []);
    }

    playerRooms.get(room).push(player);

    socket.join(room); // Join the room here
    io.to(room).emit("updatePlayers", playerRooms.get(room));
  });

  socket.on("getQuestion", async () => {
    try {
      const randomQuestion = await getRandomQuestion();
      io.to(room).emit("question", randomQuestion);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  });

  socket.on("submitAnswer", ({ username, isCorrectAnswer }) => {
    let playerToUpdate;
    if (isCorrectAnswer) {
      for (const [roomId, players] of playerRooms.entries()) {
        playerToUpdate = players.find((player) => player.name === username);
        if (playerToUpdate) {
          break;
        }
      }
    }
    if (playerToUpdate) {
      playerToUpdate.score++; // Increment score
      let updatedPlayers;
      for (const [roomId, players] of playerRooms.entries()) {
        updatedPlayers = players;
      }
      io.to(room).emit("updateScore", {
        players: updatedPlayers,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
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
