import { useState, useEffect, useContext } from "react";
import useSocket from "../hooks/useSocket";
import GameContext from "../store/context";

import ScoreSheetTable from "../components/ScoreSheetTable";
import AnswerList from "../components/AnswerList";
import QuestionTimer from "../components/QuestionTimer";
import Question from "../components/Question";

const dummyQuizQuestions = [
  {
    id: 1,
    question: "What is the capital of Japan?",
    answers: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
    correctAnswer: "Tokyo",
  },
  {
    id: 2,
    question: "Who painted the Mona Lisa?",
    answers: [
      "Leonardo da Vinci",
      "Pablo Picasso",
      "Vincent van Gogh",
      "Michelangelo",
    ],
    correctAnswer: "Leonardo da Vinci",
  },
  {
    id: 3,
    question: "What is the chemical symbol for water?",
    answers: ["H2O", "CO2", "NaCl", "O2"],
    correctAnswer: "H2O",
  },
  {
    id: 4,
    question: "What is the largest planet in our solar system?",
    answers: ["Jupiter", "Saturn", "Mars", "Earth"],
    correctAnswer: "Jupiter",
  },
  {
    id: 5,
    question: "Who wrote 'To Kill a Mockingbird'?",
    answers: [
      "Harper Lee",
      "John Steinbeck",
      "F. Scott Fitzgerald",
      "Mark Twain",
    ],
    correctAnswer: "Harper Lee",
  },
  {
    id: 6,
    question: "What is the main ingredient in guacamole?",
    answers: ["Avocado", "Tomato", "Onion", "Lime"],
    correctAnswer: "Avocado",
  },
  {
    id: 7,
    question: "Which country is known as the Land of the Rising Sun?",
    answers: ["Japan", "China", "Korea", "Vietnam"],
    correctAnswer: "Japan",
  },
  {
    id: 8,
    question: "Who is known as the father of modern physics?",
    answers: [
      "Isaac Newton",
      "Albert Einstein",
      "Galileo Galilei",
      "Niels Bohr",
    ],
    correctAnswer: "Albert Einstein",
  },
  {
    id: 9,
    question: "What is the currency of Brazil?",
    answers: ["Real", "Peso", "Dollar", "Euro"],
    correctAnswer: "Real",
  },
  {
    id: 10,
    question: "Which mammal can fly?",
    answers: ["Bat", "Mouse", "Rat", "Squirrel"],
    correctAnswer: "Bat",
  },
];

export default function GameRoom() {
  const socket = useSocket();
  const gameCtx = useContext(GameContext);
  const { players, addPlayer } = gameCtx;

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(5);
  const [reveal, setReveal] = useState(false);
  const [playerAnswers, setPlayerAnswers] = useState([]);
  const [questionElement, setQuestionElement] = useState(null);

  const username = localStorage.getItem("username");

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Switching questions function
  useEffect(() => {
    if (timer === 0) {
      setReveal(true);
      setTimeout(() => {
        const randomIndex = Math.floor(
          Math.random() * dummyQuizQuestions.length
        );
        const randomElement = dummyQuizQuestions[randomIndex];
        setQuestionElement(randomElement);
        setReveal(false);
        setTimer(5);
      }, 3500);
    }
  }, [timer]);

  // Function for providing 1 question object from database
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * dummyQuizQuestions.length);
    const randomElement = dummyQuizQuestions[randomIndex];
    setQuestionElement(randomElement);
  }, []);

  // Connection with socket server
  useEffect(() => {
    socket.on("broadcastAnswer", (answer) => {
      setPlayerAnswers((prevAnswers) => [...prevAnswers, answer]);
    });

    // Listen for updateScore events
    socket.on("updateScore", ({ username, score }) => {
      // Update the score of the player with the specified username
      const updatedPlayers = players.map((player) =>
        player.name === username ? { ...player, score } : player
      );
      console.log(updatedPlayers)
      addPlayer(updatedPlayers);
    });

    return () => {
      socket.off("broadcastAnswer");
      socket.off("updateScore");
    };
  }, [socket, players]);

  // Function for selecting answer
  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    const isCorrectAnswer = answer === questionElement.correctAnswer;
    socket.emit("submitAnswer", { answer, username, isCorrectAnswer });
  };

  console.log(players)
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
