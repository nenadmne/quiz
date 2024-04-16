import Logo from "../assets/logo.png";
import ScoreSheet from "./ScoreSheet";
import Lottie from "lottie-react";

import WrongAnswer from "../assets/WrongAnswer.json";
import NoAnswer from "../assets/NoAnswer.json";

export default function ScoreSheetTable({
  playerOneName,
  playerOneScore,
  playerTwoName,
  playerTwoScore,
  questionElement,
  reveal,
  answers,
}) {
  const angryAnimation = () => {
    const noAnswerPlayerOne = answers[0].selectedAnswer === null;
    const noAnswerPlayerTwo = answers[1].selectedAnswer === null;

    const isWrongAnswerPlayerOne =
      questionElement.correctAnswer !== answers[0].selectedAnswer && !noAnswerPlayerOne;
    const isWrongAnswerPlayerTwo =
      questionElement.correctAnswer !== answers[1].selectedAnswer && !noAnswerPlayerTwo;

    return (
      <>
        {isWrongAnswerPlayerOne && reveal && (
          <div className="absolute w-[4rem] top-0 left-0">
            <Lottie animationData={WrongAnswer} loop={true} />
          </div>
        )}
        {noAnswerPlayerOne && reveal && (
          <div className="absolute w-[4rem] top-0 left-0">
            <Lottie animationData={NoAnswer} loop={true} />
          </div>
        )}
        {isWrongAnswerPlayerTwo && reveal && (
          <div className="absolute w-[4rem] right-0 top-0">
            <Lottie animationData={WrongAnswer} loop={true} />
          </div>
        )}
        {noAnswerPlayerTwo && reveal && (
          <div className="absolute w-[4rem] right-0 top-0">
            <Lottie animationData={NoAnswer} loop={true} />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="w-[52rem] gap-8 flex flex-row justify-between items-end">
      {answers && answers.length === 2 && angryAnimation()}
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
