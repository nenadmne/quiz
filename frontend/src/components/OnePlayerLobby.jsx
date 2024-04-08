import LobbyBackground from "./Backgrounds/LobbyBackground";
import vsImage from "../assets/vs.png";

const style = "text-3xl w-[400px] flex justify-center items-center p-2";

export default function OnePlayerLobby({ queue, dots, players }) {
  // Function for queue display
  const queueTime = (queue) => {
    if (queue / 60 >= 1) {
      return `${Math.floor(queue / 60)}min ${queue % 60}sec`;
    } else {
      return `${queue % 60}sec`;
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <LobbyBackground />
      <img src={vsImage} className="w-[10rem] absolute pb-[8rem] z-10" />
      <div className="flex flex-col gap-24 justify-center items-center w-full h-full">
        <div className="flex flex-row justify-center items-center">
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
    </div>
  );
}
