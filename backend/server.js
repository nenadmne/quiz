const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const users = require("./routes/users");
const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let players = [];

app.use(cors());
app.use(bodyParser.json());
app.use(users)

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join", (playerName) => {
    const player = { id: socket.id, name: playerName, score: 0 };
    console.log(player);
    players.push(player);
    io.emit("updatePlayers", players, players.length);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    players = players.filter((player) => player.id !== socket.id);
    io.emit("updatePlayers", players, players.length);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
