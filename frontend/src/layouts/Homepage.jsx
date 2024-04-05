import { useState } from "react";
import io from "socket.io-client";

import NavigationBar from "../components/NavigationBar";
import JoinGameBtn from "../components/JoinGameBtn";
import Background from "../components/Background";
import Lobby from "./Lobby";
import LobbyBackground from "../components/LobbyBackground";

const ENDPOINT = "http://localhost:4000";

function Homepage() {
  const [play, setPlay] = useState(false);
  const username = localStorage.getItem("username");
  const [players, setPlayers] = useState([]);

  const handleJoinGame = () => {
    if (username) {
      setPlay(true);
      const socket = io(ENDPOINT, { transports: ["websocket"] });
      socket.emit("join", username);
      socket.on("updatePlayers", (updatedPlayers, playerCount) => {
        setPlayers(updatedPlayers);
      });
      socket.on("startGame", () => {
        // Handle game start event if needed
      });
      return () => {
        socket.disconnect();
      };
    }
  };

  return (
    <>
      <NavigationBar />
      <section className="w-full h-full flex flex-col justify-center items-center">
        {!play && <Background play={play} />}
        {!play && <JoinGameBtn handleJoinGame={handleJoinGame} />}
        {play && <LobbyBackground />}
        {play && <Lobby players={players} />}
      </section>
    </>
  );
}

export default Homepage;
