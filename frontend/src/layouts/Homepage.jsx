import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

import JoinGameBtn from "../components/JoinGameBtn";
import Background from "../components/Backgrounds/Background";
import Lobby from "./Lobby";
import LobbyBackground from "../components/Backgrounds/LobbyBackground";
import vsImage from "../assets/vs.png";

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
      <section className="w-full h-full flex flex-col justify-center items-center">
        {!gameStarted && <Background play={play} />}
        {!play && loaded && <JoinGameBtn handleJoinGame={handleJoinGame} />}
        {gameStarted && <LobbyBackground />}
        {gameStarted && <Lobby players={players} />}
        {gameStarted && (
          <img src={vsImage} className="w-[10rem] absolute pb-[5rem]" />
        )}
      </section>
    </>
  );
}

export default Homepage;
