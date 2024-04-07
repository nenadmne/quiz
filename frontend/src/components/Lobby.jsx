import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const style = "text-3xl w-[400px] flex justify-center items-center p-2";

function Lobby({ players }) {
  const [countdown, setCountdown] = useState(5);
  const [dots, setDots] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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

  useEffect(() => {
    if (countdown === 0) {
      navigate("/gameroom");
    }
  }, [countdown]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length === 3 ? "" : prevDots + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  if (players === undefined) {
    return <div> Loading... </div>;
  } else {
    if (players.length === 1) {
      return (
        <div className="flex flex-row justify-center items-center w-full h-full pb-[5rem]">
          <span
            className={`${style} rounded-bl-2xl rounded-tl-2xl bg-green-500`}
          >
            {players[0].name}
          </span>
          <span
            className={`${style} rounded-br-2xl rounded-tr-2xl bg-stone-100`}
          >
            Waiting for opponent{dots}
          </span>
        </div>
      );
    } else if (players.length === 2) {
      return (
        <div className="flex flex-col gap-24 justify-center items-center w-full h-full">
          <div className="flex flex-row justify-center items-center">
            <span
              className={`${style} rounded-bl-2xl rounded-tl-2xl bg-green-500 border`}
            >
              {players[0].name}
            </span>
            <span
              className={`${style} rounded-br-2xl rounded-tr-2xl bg-green-500 border`}
            >
              {players[1].name}
            </span>
          </div>
          <span
            className={`text-4xl text-white transition-transform duration-100 ease-in-out transform ${
              countdown !== 0 ? "scale-110" : ""
            }`}
          >
            {countdown}
          </span>
        </div>
      );
    }
  }
}

export default Lobby;
