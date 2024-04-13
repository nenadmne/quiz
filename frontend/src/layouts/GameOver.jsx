import Confetti from "../components/Confetti/Confetti";

export default function GameOver() {
  return (
    <div className="w-full h-full flex bg-blackGrad pt-8 justify-center">
      <div className="h-fit flex flex-col bg-greyGrad p-8 rounded gap-8 items-center ">
        <div className="border border-black p-2">
          The winner is <strong>PLAYER ONE</strong>
        </div>
        <div>
          <Confetti />
        </div>
      </div>
    </div>
  );
}

//   if (questionNumber === 5) {
//     const winner = players.reduce((prevPlayer, currentPlayer) => {
//       return currentPlayer.score > prevPlayer.score
//         ? currentPlayer
//         : prevPlayer;
//     });
