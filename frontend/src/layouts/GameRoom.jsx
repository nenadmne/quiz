import { useState, useEffect } from "react";
import useSocket from "../hooks/useSocket";

export default function GameRoom() {
  const [question] = useState("What is the capital of France?");
  const [answers] = useState(["A. London", "B. Berlin", "C. Paris", "D. Rome"]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [playerAnswers, setPlayerAnswers] = useState([]); // State to store answers from players
  const socket = useSocket(); // Obtain the socket instance from the hook
  const username = localStorage.getItem("username");

  useEffect(() => {
    socket.on("broadcastAnswer", (answer) => {
      setPlayerAnswers((prevAnswers) => [...prevAnswers, answer]);
    });

    return () => {
      socket.off("broadcastAnswer");
    };
  }, [socket]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    socket.emit("submitAnswer", { answer, username }); // Emit the selected answer to the socket server
  };

  console.log(playerAnswers);
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
      <div>
        <h3>Answers from Players:</h3>
        <ul>
          {playerAnswers.map((item, index) => (
            <li key={index}>{`${item.username} answered ${item.answer}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
