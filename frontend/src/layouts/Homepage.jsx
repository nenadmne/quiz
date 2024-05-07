import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import JoinGameBtn from "../components/JoinGameBtn";
import Background from "../components/Backgrounds/Background";
import ChatComponent from "../components/Chat";
import useSocket from "../hooks/useSocket";
import { redirectHome } from "../util/redirects";
import { getGameroom, getUserToken, getUsername } from "../util/getItem";
import { removeGameroom } from "../util/removeItem";

import IconButton from "@mui/material/IconButton";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function Homepage() {
  const [play, setPlay] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [message, setMessage] = useState("");

  const username = getUsername();
  const gameroom = getGameroom();
  const socket = useSocket();
  const navigate = useNavigate();
  const token = getUserToken();

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2800);
  }, []);

  useEffect(() => {
    if (gameroom) {
      redirectHome();
      removeGameroom();
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
        if (activeButtonIndex === 0) {
          navigate("/lobby");
        } else {
          navigate("/privateRoom");
        }
        setPlay(false);
      }, 2800);
    }
  };

  useEffect(() => {
    if (activeButtonIndex === 0) {
      setMessage("Play");
    } else {
      setMessage("Private game");
    }
  }, [activeButtonIndex]);

  useEffect(() => {
    if (token) {
      setMessage("Play");
    } else {
      setMessage("Login");
    }
  }, [token]);

  const handleNextButton = () => {
    setActiveButtonIndex((prevIndex) => (prevIndex === 1 ? 0 : 1));
  };

  return (
    <>
      <section className="w-full h-full flex flex-col justify-center items-center">
        {!gameStarted && <Background play={play} />}
        {!play && loaded && (
          <section className="absolute w-full h-full flex flex-col items-center justify-center mb-[1.5rem] md:mb-0">
            <JoinGameBtn handleJoinGame={handleJoinGame} message={message} />
            <IconButton onClick={handleNextButton}>
              <ArrowRightIcon sx={{ color: "white" }} className="font-arrow" />
            </IconButton>
          </section>
        )}
        <ChatComponent />
      </section>
    </>
  );
}

export default Homepage;
