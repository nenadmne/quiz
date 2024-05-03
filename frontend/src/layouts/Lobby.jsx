import { useState, useEffect, useContext } from "react";
import GameContext from "../store/context";
import useSocket from "../hooks/useSocket";
import { redirectHome } from "../util/redirects";

import OnePlayerLobby from "../components/Lobby/OnePlayerLobby";
import TwoPlayerLobby from "../components/Lobby/TwoPlayerLobby";
import Loading from "../components/Loading";
import { getGameroom, getUsername } from "../util/getItem";
import { removeGameroom } from "../util/removeItem";

function Lobby() {
  const [countdown, setCountdown] = useState(5);
  const [queue, setQueue] = useState(0);
  const socket = useSocket();

  const gameCtx = useContext(GameContext);
  const { players, addPlayer } = gameCtx;
  const username = getUsername();
  const gameroom = getGameroom();

  // Connecting with socket and storing connected players in context
  useEffect(() => {
    if (gameroom) {
      socket.disconnect();
      removeGameroom();
      redirectHome();
    }
    socket.emit("join", username);
    socket.on("updatePlayers", (updatedPlayers) => {
      addPlayer(updatedPlayers);
    });
  }, []);

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

  // Handling back button logic in lobby
  useEffect(() => {
    const handleBackButton = () => {
      socket.disconnect();
    };
    window.addEventListener("popstate", handleBackButton);
  }, []);

  // Statement that returns player to homepage if he types in url lobby route
  if (!socket && players.length === 0) {
    redirectHome();
  } else if (players.length === 1) {
    return <OnePlayerLobby queue={queue} players={players} />;
  } else if (players.length === 2) {
    return <TwoPlayerLobby countdown={countdown} players={players} />;
  }
  return (
    <Loading className="w-full h-full bg-blackGrad flex flex-col gap-4 justify-center items-center" />
  );
}

export default Lobby;
