import { useState, useEffect, useContext } from "react";
import useSocket from "../hooks/useSocket";
import GameContext from "../store/context";

import ScoreSheetTable from "../components/ScoreSheetTable";
import AnswerList from "../components/AnswerList";
import QuestionTimer from "../components/QuestionTimer";
import Question from "../components/Question";
import Loading from "../components/Loading";
import GameOver from "./GameOver";

export default function GameRoom() {
  const socket = useSocket();
  const gameCtx = useContext(GameContext);
  const { players, addPlayer, addAnswers } = gameCtx;

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(10);
  const [reveal, setReveal] = useState(false);
  const [questionElement, setQuestionElement] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);

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
      if (username === players[0].name) {
        socket.emit("getQuestion");
      }

      socket.on("question", (receivedQuestion, numberOfQuestions) => {
        setQuestionElement(receivedQuestion);
        setQuestionNumber(numberOfQuestions);
        if (questionElement) {
          setTimer(5);
        }
        setReveal(false);
        setSelectedAnswer(null);
      });
    };

    if (timer === 0) {
      setReveal(true);
      const isCorrectAnswer = selectedAnswer === questionElement.correctAnswer;
      const points = questionElement.points;
      socket.emit("submitAnswer", {
        selectedAnswer,
        username,
        isCorrectAnswer,
        points,
      });

      setTimeout(fetchQuestion, 3500);
    }
  }, [timer]);

  // Function for providing 1 question object from database
  useEffect(() => {
    if (username === players[0].name) {
      socket.emit("getQuestion");
    }
    socket.on("question", (receivedQuestion, numberOfQuestions) => {
      setQuestionElement(receivedQuestion);
      setQuestionNumber(numberOfQuestions);
    });
  }, []);

  // Listen for updateScore events
  useEffect(() => {
    socket.on("updateScore", ({ players, answers }) => {
      addPlayer(players);
      addAnswers(answers);
    });
  }, [socket, questionNumber]);

  // Function for selecting answer
  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  if (questionNumber === 5) {
    return <GameOver players={players} />;
  }

  return (
    <div className="w-full h-full gap-8 flex flex-col items-center bg-blackGrad pt-8">
      {questionElement ? (
        <>
          <ScoreSheetTable
            playerOneName={players[0]?.name ? players[0].name : "User left"}
            playerOneScore={players[0]?.score ? players[0].score : 0}
            playerTwoName={players[1]?.name ? players[1].name : "User left"}
            playerTwoScore={players[1]?.score ? players[1].score : 0}
          />

          <div className="p-12 flex justify-center items-center flex-col bg-greyGrad rounded-xl">
            <QuestionTimer timer={timer} points={questionElement.points} />
            <Question questionElement={questionElement} />
            <AnswerList
              reveal={reveal}
              selectedAnswer={selectedAnswer}
              questionElement={questionElement}
              handleAnswerSelection={handleAnswerSelection}
            />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
