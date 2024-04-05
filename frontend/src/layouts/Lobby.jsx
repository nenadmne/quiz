import { useState, useEffect } from "react";

const style = "text-3xl w-[400px] flex justify-center items-center p-2";

function Lobby({ players }) {
  const [countdown, setCountdown] = useState(5);

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

  if (players === undefined) {
    return <div> Loading </div>;
  } else {
    if (players.length === 1) {
      return (
        <div className="flex flex-row justify-center items-center w-full h-full">
          <span
            className={`${style} rounded-bl-2xl rounded-tl-2xl bg-green-500`}
          >
            {players[0].name}
          </span>
          <span
            className={`${style} rounded-br-2xl rounded-tr-2xl bg-stone-100`}
          >
            Waiting for opponent...
          </span>
        </div>
      );
    } else if (players.length === 2) {
      return (
        <div className="flex flex-col gap-12 justify-center items-center w-full h-full">
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
          <span className="text-4xl">{countdown}</span>
        </div>
      );
    }
  }
}

export default Lobby;
