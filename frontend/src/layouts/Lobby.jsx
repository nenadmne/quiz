import { useState, useEffect, useContext } from "react";
import GameContext from "../store/context";
import useSocket from "../hooks/useSocket";

import OnePlayerLobby from "../components/OnePlayerLobby";
import TwoPlayerLobby from "../components/TwoPlayerLobby";
import Loading from "../components/Loading";

function Lobby() {
  const [countdown, setCountdown] = useState(5);
  const [queue, setQueue] = useState(0);

  const gameCtx = useContext(GameContext);
  const { players, addPlayer } = gameCtx;
  const socket = useSocket();
  const username = localStorage.getItem("username");

  useEffect(() => {
    socket.emit("join", username);
    socket.on("updatePlayers", (updatedPlayers) => {
      addPlayer(updatedPlayers);
    });
  }, [socket]);

  // Function for different messages depending on player count
  useEffect(() => {
    if (players.length === 1) {
      const interval = setInterval(() => {
        setQueue((prevCountdown) => prevCountdown + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    if (players.length === 2) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      if (countdown === 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
  }, [countdown, players]);

  if (players.length === 1) {
    return <OnePlayerLobby queue={queue} players={players} />;
  } else if (players.length === 2) {
    return <TwoPlayerLobby countdown={countdown} players={players} />;
  }

  return (
    <div className="w-full h-full bg-blackGrad flex flex-col gap-4 justify-center items-center">
      <Loading />
    </div>
  );
}

export default Lobby;
