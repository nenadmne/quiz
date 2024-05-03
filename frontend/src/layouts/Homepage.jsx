import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import JoinGameBtn from "../components/JoinGameBtn";
import Background from "../components/Backgrounds/Background";
import ChatComponent from "../components/Chat";
import useSocket from "../hooks/useSocket";
import reloadHome from "../util/reloadHome";

function Homepage() {
  const [play, setPlay] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const username = localStorage.getItem("username");
  const gameroom = localStorage.getItem("gameroom");
  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2800);
  }, []);

  useEffect(() => {
    if (gameroom) {
      reloadHome();
      localStorage.removeItem("gameroom");
      if (socket) {
        socket.disconnect();
      }
    }
  }, [gameroom, socket]);

  const handleJoinGame = () => {
    if (username) {
      setPlay(true);
      setTimeout(() => {
        setGameStarted(true);
        navigate("/lobby");
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
