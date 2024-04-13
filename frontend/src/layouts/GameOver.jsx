import Logo from "../assets/logo.png";
import Confetti from "../components/Confetti/Confetti";

export default function GameOver({ players }) {
  const winner = players.reduce((prevPlayer, currentPlayer) => {
    return currentPlayer.score > prevPlayer.score ? currentPlayer : prevPlayer;
  });

  return (
    <div className="w-full h-full flex bg-blackGrad pt-8 justify-center">
      <div className="h-fit flex flex-col bg-greyGrad pb-4 px-4 rounded justify-center items-center">
        <img
          src={Logo}
          alt="logo image"
          className="w-[10rem] bg-darkBlue rounded-xl"
        />
        <div className="w-[90%] border border-black text-[1.75rem] w-full flex flex-row items-center justify-center gap-2">
          <span> The winner is </span>
          <strong>{winner.name}</strong>
        </div>
        <div className="w-[90%] h-fit flex flex-row py-8 rounded justify-between items-center">
          <div className="w-[45%] flex flex-col p-4 bg-blueGrad text-white items-center justify-center gap-4 rounded">
            <p className="text-[1.5rem]">{players[0].name}</p>
            <strong className="text-[3rem]">{players[0].score}</strong>
          </div>
          <div className="w-[45%] flex flex-col p-4 bg-blueGrad text-white items-center justify-center gap-4 rounded">
            <p className="text-[1.5rem]">{players[1].name}</p>
            <strong className="text-[3rem]">{players[1].score}</strong>
          </div>
        </div>
        <div>
          <Confetti />
        </div>
      </div>
    </div>
  );
}
