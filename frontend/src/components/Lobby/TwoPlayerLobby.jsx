import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LobbyBackground from "../Backgrounds/LobbyBackground";
import vsImage from "../../assets/vs.png";

const style =
  "text-normal sm:text-lg md:text-2xl lg:text-3xl w-[180px] sm:w-[250px] md:w-[350px] lg:w-[400px] flex justify-center items-center p-2";

export default function TwoPlayerLobby({ players, countdown }) {
  const navigate = useNavigate();

  // Function for reddirect players to game
  useEffect(() => {
    if (countdown === 0) {
      navigate("/gameroom");
    }
  }, [countdown]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <LobbyBackground />
      <img
        src={vsImage}
        className="w-[5rem] md:w-[8rem] lg:w-[9rem] absolute pb-[15rem] sm:pb-[11rem] md:pb-[5rem] lg:pb-[5rem] z-10"
      />
      <div className="flex flex-col gap-24 justify-center items-center w-full h-full mb-24 sm:mb-10 md:mb-[-4rem]">
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
        <div className="text-normal sm:text-lg md:text-xl text-darkPurple px-6 py-2 bg-white rounded-xl">
          Game starting in
          <strong>{` ${countdown} `}</strong>
          seconds
        </div>
      </div>
    </div>
  );
}
