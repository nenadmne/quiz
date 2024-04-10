import { useState, useEffect, useContext } from "react";
import useSocket from "../hooks/useSocket";
import GameContext from "../store/context";

import ScoreSheetTable from "../components/ScoreSheetTable";
import AnswerList from "../components/AnswerList";
import QuestionTimer from "../components/QuestionTimer";
import Question from "../components/Question";

export default function GameRoom() {
  const socket = useSocket();
  const gameCtx = useContext(GameContext);
  const { players, addPlayer } = gameCtx;

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(5);
  const [reveal, setReveal] = useState(false);
  const [questionElement, setQuestionElement] = useState(null);
  const username = localStorage.getItem("username");

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer >= 1) {
          return prevTimer - 1;
        }
        return prevTimer;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Switching questions function
  useEffect(() => {
    const fetchQuestion = () => {
      if(username === players[0].name){
        socket.emit("getQuestion");
      }
      // Listen for question event from the backend
      socket.on("question", (receivedQuestion) => {
        console.log(receivedQuestion)
        setQuestionElement(receivedQuestion);
        setReveal(false);
        setSelectedAnswer(null);
        setTimer(5); // Reset the timer to 5
      });
    };

    if (timer === 0) {
      setReveal(true);
      setTimeout(fetchQuestion, 3500);
    }
  }, [timer, questionElement]);

  // Function for providing 1 question object from database
  useEffect(() => {
    socket.emit("getQuestion");
    // Listen for question event from the backend
    socket.on("question", (receivedQuestion) => {
      setQuestionElement(receivedQuestion);
    });
  }, []);

  // Listen for updateScore events
  useEffect(() => {
    socket.on("updateScore", ({ players }) => {
      console.log(players);
      addPlayer(players);
    });
  }, [socket]);

  // Function for selecting answer
  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    const isCorrectAnswer = answer === questionElement.correctAnswer;
    socket.emit("submitAnswer", { username, isCorrectAnswer });
  };

  return (
    questionElement && (
      <div className="w-full h-full gap-8 flex flex-col items-center bg-blackGrad pt-8">
        <ScoreSheetTable
          playerOneName={players[0].name}
          playerOneScore={players[0].score}
          playerTwoName={players[1].name}
          playerTwoScore={players[1].score}
        />

        <div className="p-12 flex justify-center items-center flex-col bg-greyGrad rounded-xl">
          <QuestionTimer timer={timer} />
          <Question questionElement={questionElement} />
          <AnswerList
            reveal={reveal}
            selectedAnswer={selectedAnswer}
            questionElement={questionElement}
            handleAnswerSelection={handleAnswerSelection}
          />
        </div>
      </div>
    )
  );
}
