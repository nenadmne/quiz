const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const users = require("./routes/users");
const PORT = process.env.PORT || 4000;
const app = express();

// 1.step on creating io
const server = http.createServer(app);

// 2.step on creating io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use(users);

// Store the mapping of players to rooms
const playerRooms = new Map();

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join", (playerName) => {
    const player = { id: socket.id, name: playerName, score: 0 };
    console.log(player);

    let room;
    for (const [roomId, players] of playerRooms.entries()) {
      if (players.length < 2) {
        room = roomId;
        break;
      }
    }
    if (!room) {
      room = socket.id; // Use socket ID as room ID
      playerRooms.set(room, []);
      console.log("New room created:", room);
    }

    playerRooms.get(room).push(player);

    socket.join(room); // Join the room here
    io.to(room).emit(
      "updatePlayers",
      playerRooms.get(room),
      playerRooms.get(room).length
    );
  });

  socket.on("submitAnswer", ({ answer, username, isCorrectAnswer }) => {
    const room = [...socket.rooms][0];
    // Emit the submitted answer to all clients in the room
    io.to(room).emit("broadcastAnswer", answer);
    let playerToUpdate;
    if (isCorrectAnswer) {
      console.log(playerRooms)
      for (const [roomId, players] of playerRooms.entries()) {
        playerToUpdate = players.find((player) => player.name === username);
        break;
      }
    }
    if (playerToUpdate) {
      playerToUpdate.score++; // Increment score
      // Emit the updated score to all clients in the room
      io.to(room).emit("updateScore", {
        username,
        score: playerToUpdate.score,
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
      io.to(room).emit(
        "updatePlayers",
        playerRooms.get(room),
        playerRooms.get(room).length
      );
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
