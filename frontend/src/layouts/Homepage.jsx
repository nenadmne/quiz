import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import GameContext from "../store/context";

import JoinGameBtn from "../components/JoinGameBtn";
import Background from "../components/Backgrounds/Background";
import ChatComponent from "../components/Chat";

function Homepage() {
  const [play, setPlay] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const socket = useSocket();
  const gameCtx = useContext(GameContext);
  const { addPlayer } = gameCtx;

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
        socket.on("updatePlayers", (updatedPlayers) => {
          addPlayer(updatedPlayers);
        });
        setGameStarted(true);
        navigate("lobby");
        setPlay(false);
      }, 2800);
    }
  };

  return (
    <>
      <section className="w-full h-full flex flex-col justify-center items-center">
        {!gameStarted && <Background play={play} />}
        {!play && loaded && <JoinGameBtn handleJoinGame={handleJoinGame} />}
        <ChatComponent />
      </section>
    </>
  );
}

export default Homepage;
