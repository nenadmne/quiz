import { useContext, useEffect, useState } from "react";
import GameContext from "../store/context";

export default function AnswerList({
  questionElement,
  selectedAnswer,
  reveal,
  handleAnswerSelection,
}) {
  const username = localStorage.getItem("username");
  const [playerAnswers, setPlayerAnswers] = useState();
  const gameCtx = useContext(GameContext);
  const { answers } = gameCtx;

  useEffect(() => {
    if (answers.length === 2) {
      setPlayerAnswers(answers);
    }
  }, [answers]);

  console.log(playerAnswers);

  return (
    <ul className="grid grid-cols-2 gap-8">
      {questionElement.answers.map((answer, index) => {
        const otherPlayerAnswer =
          playerAnswers &&
          playerAnswers.find((item) => item.username !== username)
            ?.selectedAnswer;
        const isOtherPlayerAnswer = otherPlayerAnswer === answer;
        return (
          <li key={index} className="w-[22rem]">
            <button
              className={`${
                selectedAnswer === answer &&
                selectedAnswer !== null &&
                "disabled bg-darkPurple hover:bg-darkPurple"
              } text-white bg-blueGrad font-bold py-2 px-4 rounded w-full ${
                reveal && answer === questionElement.correctAnswer
                  ? "animate-pulse"
                  : ""
              } ${isOtherPlayerAnswer ? "bg-redGrad" : ""}
              ${
                selectedAnswer === null &&
                "bg-blueGrad hover:bg-darkPurple hover:scale-105"
              }`}
              onClick={() => handleAnswerSelection(answer)}
              disabled={selectedAnswer !== null}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

//
