import Logo from "../../assets/logo.png";
import ScoreSheet from "./ScoreSheet";
import Lottie from "lottie-react";

import WrongAnswer from "../../assets/WrongAnswer.json";
import CorrectAnswer from "../../assets/CorrectAnswer.json";
import NoAnswer from "../../assets/NoAnswer.json";

export default function ScoreSheetTable({
  players,
  questionElement,
  reveal,
  answers,
}) {
  const playerOneName = players[0].name;
  const playerOneScore = players[0].score;
  const playerTwoName = players[1].name;
  const playerTwoScore = players[1].score;

  const animations = () => {
    const noAnswerPlayerOne = answers[0].selectedAnswer === null;
    const noAnswerPlayerTwo = answers[1].selectedAnswer === null;

    const isWrongAnswerPlayerOne =
      questionElement.correctAnswer !== answers[0].selectedAnswer &&
      !noAnswerPlayerOne;
    const isWrongAnswerPlayerTwo =
      questionElement.correctAnswer !== answers[1].selectedAnswer &&
      !noAnswerPlayerTwo;
    const isCorrectAnswerPlayerOne =
      questionElement.correctAnswer === answers[0].selectedAnswer;
    const isCorrectAnswerPlayerTwo =
      questionElement.correctAnswer === answers[1].selectedAnswer;

    return (
      <>
        {isWrongAnswerPlayerOne && reveal && (
          <div className="absolute w-[2rem] md:w-[3.5rem] lg:w-[5rem] top-[-1.5rem] md:top-[-0.5rem] lg:top-[-1rem] left-0">
            <Lottie animationData={WrongAnswer} loop={true} />
          </div>
        )}
        {isCorrectAnswerPlayerOne && reveal && (
          <div className="absolute w-[2.5rem] md:w-[4rem] lg:w-[5.5rem] top-[-1.5rem] md:top-[-0.5rem] lg:top-[-1rem] left-0">
            <Lottie animationData={CorrectAnswer} loop={true} />
          </div>
        )}
        {noAnswerPlayerOne && reveal && (
          <div className="absolute w-[2.5rem] md:w-[4rem] lg:w-[5.5rem] top-[-1.5rem] md:top-[-0.5rem] lg:top-[-1rem] left-0">
            <Lottie animationData={NoAnswer} loop={true} />
          </div>
        )}
        {isWrongAnswerPlayerTwo && reveal && (
          <div className="absolute w-[2rem] md:w-[3.5rem] lg:w-[5rem] right-0 top-[-1.5rem] md:top-[-0.5rem] lg:top-[-1rem]">
            <Lottie animationData={WrongAnswer} loop={true} />
          </div>
        )}
        {isCorrectAnswerPlayerTwo && reveal && (
          <div className="absolute w-[2.5rem] md:w-[4rem] lg:w-[5.5rem] right-0 top-[-1.5rem] md:top-[-0.5rem] lg:top-[-1rem]">
            <Lottie animationData={CorrectAnswer} loop={true} />
          </div>
        )}
        {noAnswerPlayerTwo && reveal && (
          <div className="absolute w-[2.5rem] md:w-[4rem] lg:w-[5.5rem] right-0 top-[-1.5rem] md:top-[-0.5rem] lg:top-[-1rem]">
            <Lottie animationData={NoAnswer} loop={true} />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="w-[95%] lg:w-[52rem] flex flex-row justify-between items-end">
      {answers && answers.length === 2 && animations()}
      <ScoreSheet playerName={playerOneName} playerScore={playerOneScore} />
      <img
        src={Logo}
        alt="logo image"
        className="w-[5rem] md:w-[8.5rem] 2xl:w-[10rem] top-[1rem] bg-greyGrad rounded-xl shadow-xl shadow-black"
      />
      <ScoreSheet playerName={playerTwoName} playerScore={playerTwoScore} />
    </div>
  );
}
