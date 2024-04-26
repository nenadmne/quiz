import { useEffect, useState } from "react";

export default function AnswerList({
  questionElement,
  selectedAnswer,
  reveal,
  handleAnswerSelection,
  answers,
}) {
  const username = localStorage.getItem("username");
  const [playerAnswers, setPlayerAnswers] = useState();

  useEffect(() => {
    if (answers.length === 2) {
      setPlayerAnswers(answers);
    }
  }, [answers]);

  return (
    <ul className="w-full grid grid-cols-2 gap-8">
      {questionElement.answers.map((answer, index) => {
        const otherPlayerAnswer =
          playerAnswers &&
          playerAnswers.find((item) => item.username !== username)
            ?.selectedAnswer;
        const isOtherPlayerAnswer = otherPlayerAnswer === answer;
        const bothSelectedSameAnswer =
          playerAnswers &&
          playerAnswers[0].selectedAnswer === answer &&
          playerAnswers[1].selectedAnswer === answer;

        return (
          <li key={index} className="w-full">
            <button
              className={`${
                selectedAnswer === answer &&
                selectedAnswer !== null &&
                "disabled bg-darkPurple hover:bg-darkPurple"
              } text-white bg-blueGrad font-bold py-2 px-4 rounded w-full ${
                reveal && answer === questionElement.correctAnswer
                  ? "animate-pulse"
                  : ""
              }
              ${isOtherPlayerAnswer && !bothSelectedSameAnswer && "bg-redGrad"}
              ${reveal && bothSelectedSameAnswer && "bg-mixedGrad"}
              ${
                selectedAnswer === null &&
                "bg-blueGrad hover:bg-darkPurple hover:scale-105"
              }
              `}
              onClick={() => handleAnswerSelection(answer)}
              disabled={selectedAnswer !== null || reveal}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
