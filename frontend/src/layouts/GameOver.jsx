import ReactCanvasConfetti from "react-canvas-confetti";

export default function GameOver() {
  
  return (
    <div className="w-full h-full gap-8 flex flex-col items-center bg-blackGrad pt-8">
      <div className="bg-greyGrad p-8 rounded">
        <div className="border border-black p-2">
          The winner is <strong>PLAYER ONE</strong>
        </div>
        <div></div>
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
