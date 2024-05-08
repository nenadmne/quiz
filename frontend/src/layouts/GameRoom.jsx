import { useState, useEffect, useContext } from "react";
import { unstable_usePrompt } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import { getUsername } from "../util/getItem";
import GameContext from "../store/context";

import ScoreSheetTable from "../components/Gameroom/ScoreSheetTable";
import AnswerList from "../components/Gameroom/AnswerList";
import QuestionTimer from "../components/Gameroom/QuestionTimer";
import Question from "../components/Gameroom/Question";
import Loading from "../components/Loading";
import GameOver from "./GameOver";

export default function GameRoom() {
  const socket = useSocket();
  const gameCtx = useContext(GameContext);
  const { players, addPlayer, answers, addAnswers } = gameCtx;

  const username = getUsername();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(15);
  const [reveal, setReveal] = useState(false);
  const [questionElement, setQuestionElement] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [playersJoined, setPlayersJoined] = useState(null);

  // Function preventing users from leaving the game, changing the url, without confirming
  useEffect(() => {
    if (questionNumber < 5 && players !== undefined && players.length === 2) {
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = ""; // Required for legacy browsers
        return "Are you sure?";
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [questionNumber, players]);

  // Function preventing users from leaving the game, using back and foreward button
  unstable_usePrompt({
    message: "Are you sure?",
    when: ({ currentLocation, nextLocation }) =>
      questionNumber < 5 &&
      players.length === 2 &&
      players !== undefined &&
      currentLocation.pathname !== nextLocation.pathname,
  });

  // Switching questions function when time is up
  const fetchQuestion = () => {
    if (username === players[0].name) {
      socket.emit("getQuestion");
    }
    socket.on("question", (receivedQuestion, numberOfQuestions) => {
      setQuestionElement(receivedQuestion);
      setQuestionNumber(numberOfQuestions);
      setReveal(false);
      setSelectedAnswer(null);
    });
    socket.on("updateTimer", (timer) => {
      setTimer(timer);
    });
  };

  // Function for providing 1 question object from database, setting joinedPlayers, emiting gameStart event
  useEffect(() => {
    localStorage.setItem("gameroom", "gameroom"); // important for socket disconnect logic when back button is clicked and navigated to lobby
    setPlayersJoined(players);
    if (username === players[0].name) {
      socket.emit("getQuestion");
      socket.emit("gameStart", { players });
    }
    socket.on("question", (receivedQuestion, numberOfQuestions) => {
      setQuestionElement(receivedQuestion);
      setQuestionNumber(numberOfQuestions);
      addAnswers([]);
    });
  }, []);

  useEffect(() => {
    socket.on("updateTimer", (timer) => {
      setTimer(timer);
    });

    if (timer === 0) {
      setReveal(true);
      socket.emit("submitAnswer", {
        selectedAnswer,
        username,
      });
      setTimeout(fetchQuestion, 3500);
    }
  }, [timer]);

  // Listen for updateScore events
  useEffect(() => {
    if (players !== undefined && players.length === 2) {
      socket.on("updateScore", ({ players, answers }) => {
        addPlayer(players);
        addAnswers(answers);
      });
    }
  }, [socket, questionNumber, players]);

  // Function for selecting answer
  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  if (questionNumber === 5) {
    return <GameOver players={players} />;
  }

  if (players !== undefined && players.length === 1) {
    return <GameOver players={players} playersJoined={playersJoined} />;
  }

  if (players === undefined) {
    return <GameOver players={[]} playersJoined={playersJoined} />;
  }

  return (
    <div className="w-full h-full gap-4 sm:gap-8 flex flex-col items-center bg-blackGrad pt-8">
      {questionElement && players !== undefined ? (
        <>
          <ScoreSheetTable
            players={players}
            questionElement={questionElement}
            answers={answers}
            reveal={reveal}
          />

          <div className="w-[95%] lg:w-[800px] p-4 md:p-8 2xl:p-12 flex justify-center items-center flex-col bg-greyGrad rounded-xl shadow-md shadow-black">
            <QuestionTimer timer={timer} points={questionElement.points} />
            <Question questionElement={questionElement} />
            <AnswerList
              reveal={reveal}
              selectedAnswer={selectedAnswer}
              questionElement={questionElement}
              handleAnswerSelection={handleAnswerSelection}
              answers={answers}
            />
          </div>
        </>
      ) : (
        <Loading className="absolute h-full w-full flex flex-col gap-4 items-center justify-center pb-24" />
      )}
    </div>
  );
}
