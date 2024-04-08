import { useState, useEffect, useContext } from "react";
import GameContext from "../store/context";

import OnePlayerLobby from "../components/OnePlayerLobby";
import TwoPlayerLobby from "../components/TwoPlayerLobby";

function Lobby() {
  const [countdown, setCountdown] = useState(5);
  const [queue, setQueue] = useState(0);

  const gameCtx = useContext(GameContext);
  const { players } = gameCtx;

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

  console.log(players);

  if (players.length === 1) {
    return <OnePlayerLobby queue={queue} players={players} />;
  } else if (players.length === 2) {
    return <TwoPlayerLobby countdown={countdown} players={players}/>;
  }
}

export default Lobby;
