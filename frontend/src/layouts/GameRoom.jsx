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

  return (
    <div className="w-full h-full flex justify-center items-center flex-col bg-blackGrad">
      <div className="p-20 flex justify-center items-center flex-col bg-greyGrad rounded-xl">
        <p className="w-full flex justify-center items-center bg-darkPurple text-white text-xl py-4 mb-20 rounded">
          {question}
        </p>
        <ul className="grid grid-cols-2 gap-8">
          {answers.map((answer, index) => (
            <li key={index} className="w-[400px]">
              <button
                className={`${
                  selectedAnswer === answer
                    ? "bg-darkPurple hover:bg-darkPurple"
                    : "bg-blueGrad hover:bg-darkPurple"
                } text-white font-bold py-2 px-4 rounded w-full hover:scale-105`}
                onClick={() => handleAnswerSelection(answer)}
                disabled={selectedAnswer !== null}
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
