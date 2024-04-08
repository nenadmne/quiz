import Logo from "../assets/logo.png";
import ScoreSheet from "./ScoreSheet";

export default function ScoreSheetTable({
  playerOneName,
  playerOneScore,
  playerTwoName,
  playerTwoScore,
}) {
  return (
    <div className="w-[52rem] gap-8 flex flex-row justify-between items-end">
      <ScoreSheet playerName={playerOneName} playerScore={playerOneScore} />
      <img
        src={Logo}
        alt="logo image"
        className="w-[10rem] top-[1rem] bg-greyGrad rounded-xl"
      />
      <ScoreSheet playerName={playerTwoName} playerScore={playerTwoScore} />
    </div>
  );
}
