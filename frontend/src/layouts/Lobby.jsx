import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const style = "text-3xl w-[400px] flex justify-center items-center p-2";

function Lobby({ players }) {
  const [countdown, setCountdown] = useState(5);
  const [queue, setQueue] = useState(0);
  const [dots, setDots] = useState("");
  const navigate = useNavigate();

  // Function for queue display
  const queueTime = (queue) => {
    if (queue / 60 >= 1) {
      return `${Math.floor(queue / 60)}min ${queue % 60}sec`;
    } else {
      return `${queue % 60}sec`;
    }
  };

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

  // Function for reddirect players to game
  useEffect(() => {
    if (countdown === 0) {
      navigate("/gameroom");
    }
  }, [countdown]);

  // Function for displaying 1-3 dots
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
        <div className="flex flex-col gap-24 justify-center items-center w-full h-full">
          <div className="flex flex-row justify-center items-center w-full">
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
          <span
            className={`text-xl text-darkPurple px-6 py-2 bg-white rounded-xl`}
          >
            {`Queue time: ${queueTime(queue)}`}
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
          <div className="text-xl text-darkPurple px-6 py-2 bg-white rounded-xl">
            Game starting in
            <strong>{` ${countdown} `}</strong>
            seconds
          </div>
        </div>
      );
    }
  }
}

export default Lobby;
