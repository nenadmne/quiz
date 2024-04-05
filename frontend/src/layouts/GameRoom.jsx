import { useState } from "react";

export default function GameRoom() {
  const [question] = useState("What is the capital of France?");
  const [answers] = useState(["A. London", "B. Berlin", "C. Paris", "D. Rome"]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <p>{question}</p>
      <ul className="grid grid-cols-2 gap-4">
        {answers.map((answer, index) => (
          <li key={index}>
            <button
              className={`${
                selectedAnswer === answer
                  ? "bg-blue-500 hover:bg-blue-700"
                  : "bg-gray-300 hover:bg-gray-400"
              } text-white font-bold py-2 px-4 rounded`}
              onClick={() => handleAnswerSelection(answer)}
              disabled={selectedAnswer !== null}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
