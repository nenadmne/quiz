import { useState, useEffect } from "react";
import useSocket from "../hooks/useSocket";
import Logo from "../assets/logo.png";

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
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [players, setPlayers] = useState([]);
  const [timer, setTimer] = useState(5); // Initial countdown timer value
  const [glowing, setGlowing] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [playerAnswers, setPlayerAnswers] = useState([]); // State to store answers from players
  const [questionElement, setQuestionElement] = useState(null);
  const socket = useSocket(); // Obtain the socket instance from the hook
  const username = localStorage.getItem("username");

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          return 0; // Timer reached zero
        } else {
          return prevTimer - 1; // Decrease timer value by 1 second
        }
      });
    }, 1000);

    // Cleanup function to clear interval when component unmounts or timer reaches zero
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (timer <= 5) {
      setGlowing(true);
    }
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

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * dummyQuizQuestions.length);
    const randomElement = dummyQuizQuestions[randomIndex];
    setQuestionElement(randomElement);
  }, []);

  useEffect(() => {
    socket.on("broadcastAnswer", (answer) => {
      setPlayerAnswers((prevAnswers) => [...prevAnswers, answer]);
    });

    socket.on("updatePlayers", (playersInfo) => {
      setPlayers(playersInfo);
    });

    return () => {
      socket.off("broadcastAnswer");
      socket.off("updatePlayers");
    };
  }, [socket]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    socket.emit("submitAnswer", { answer, username }); // Emit the selected answer to the socket server
  };

  console.log(playerAnswers, players);

  return (
    questionElement && (
      <div className="w-full h-full flex justify-center items-center flex-col bg-blackGrad">
        <img
          src={Logo}
          alt="logo image"
          className="absolute w-[10rem] top-[1rem] bg-greyGrad rounded-xl"
        />
        <div className="p-14 flex justify-center items-center flex-col bg-greyGrad rounded-xl mb-36">
          <p className="text-black text-xl font-bold mb-12">
            {timer > 0
              ? `Time Remaining: ${timer} seconds`
              : `Preparing next question...`}
          </p>
          <p className="w-full flex justify-center items-center bg-darkPurple text-white text-xl py-4 mb-16 rounded">
            {questionElement.question}
          </p>
          <ul className="grid grid-cols-2 gap-8">
            {questionElement.answers.map((answer, index) => (
              <li key={index} className="w-[400px]">
                <button
                  className={`${
                    selectedAnswer === answer
                      ? "bg-darkPurple hover:bg-darkPurple"
                      : "bg-blueGrad hover:bg-darkPurple"
                  } text-white ${
                    reveal && answer === questionElement.correctAnswer
                      ? "animate-pulse"
                      : ""
                  } ${
                    selectedAnswer !== null
                      ? "disabled font-bold py-2 px-4 rounded w-full"
                      : "font-bold py-2 px-4 rounded w-full hover:scale-105"
                  } `}
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
    )
  );
}
