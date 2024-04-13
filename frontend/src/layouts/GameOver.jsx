import Confetti from "../components/Confetti/Confetti";

export default function GameOver({ players }) {
  const winner = players.reduce((prevPlayer, currentPlayer) => {
    return currentPlayer.score > prevPlayer.score ? currentPlayer : prevPlayer;
  });

  return (
    <div className="w-full h-full flex bg-blackGrad pt-8 justify-center">
      <div className="h-fit flex flex-col bg-greyGrad p-8 rounded gap-8 justify-center items-center">
        <div className="border border-black p-4 text-[1.75rem] w-full flex items-center justify-center">
          The winner is <strong>{winner.name}</strong>
        </div>
        <div className="w-full h-fit flex flex-row p-8 rounded gap-8 items-center">
          <div className="w-[45%] flex flex-col p-4 bg-blueGrad text-white items-center justify-center gap-8 rounded">
            <p className="text-[1.5rem]">{players[0].name}</p>
            <strong className="text-[1.5rem]">{players[0].score}</strong>
          </div>
          <div className="w-[45%] flex flex-col p-4 bg-blueGrad text-white items-center justify-center gap-8 rounded">
            <p className="text-[1.5rem]">{players[1].name}</p>
            <strong className="text-[1.5rem]">{players[1].score}</strong>
          </div>
        </div>
        <div>
          <Confetti />
        </div>
      </div>
    </div>
  );
}
