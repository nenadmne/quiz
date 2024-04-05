import { useEffect, useState } from "react";
import io from "socket.io-client";
import useSocket from "../hooks/useSocket";

import NavigationBar from "../components/NavigationBar";
import JoinGameBtn from "../components/JoinGameBtn";
import Background from "../components/Background";
import Lobby from "../components/Lobby";
import LobbyBackground from "../components/LobbyBackground";

function Homepage() {
  const [play, setPlay] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const username = localStorage.getItem("username");
  const [players, setPlayers] = useState([]);

  const socket = useSocket();
  
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2800);
  }, []);

  const handleJoinGame = () => {
    if (username) {
      setPlay(true);
      setTimeout(() => {
        socket.emit("join", username);
        socket.on("updatePlayers", (updatedPlayers, playerCount) => {
          setPlayers(updatedPlayers);
        });
        setGameStarted(true);
      }, 2800);

      return () => {
        socket.disconnect();
      };
    }
  };

  return (
    <>
      <NavigationBar />
      <section className="w-full h-full flex flex-col justify-center items-center">
        {!gameStarted && <Background play={play} />}
        {!play && loaded && <JoinGameBtn handleJoinGame={handleJoinGame} />}
        {gameStarted && <LobbyBackground />}
        {gameStarted && <Lobby players={players} />}
      </section>
    </>
  );
}

export default Homepage;
