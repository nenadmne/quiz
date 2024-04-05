const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const users = require("./routes/users");
const PORT = process.env.PORT || 4000;
const app = express();

// 1.korak
const server = http.createServer(app);

// 2.korak
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

    // Find or create a room for the player
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

    // Add the player to the room
    playerRooms.get(room).push(player);

    // Join the room
    socket.join(room);

    // Emit the updated player list to all clients in the room
    io.to(room).emit(
      "updatePlayers",
      playerRooms.get(room),
      playerRooms.get(room).length
    );
  });
  socket.on("submitAnswer", (answer) => {
    // Handle the submitted answer here
    // Broadcast the answer to all clients in the room
    io.to(room).emit("broadcastAnswer", answer);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");

    // Find the room containing the disconnected player
    let room;
    for (const [roomId, players] of playerRooms.entries()) {
      if (players.some((player) => player.id === socket.id)) {
        room = roomId;
        break;
      }
    }

    // Remove the player from the room
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
