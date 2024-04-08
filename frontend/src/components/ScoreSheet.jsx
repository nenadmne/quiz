export default function ScoreSheet({ playerName, playerScore }) {
  return (
    <div className="text-white flex flex-col justify-center items-center gap-2">
      <strong className="text-3xl w-[15rem] flex justify-center items-center"> {playerName}</strong>
      <div className="text-5xl"> {playerScore} </div>
    </div>
  );
}
