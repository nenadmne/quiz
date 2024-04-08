export default function AnswerList({
  questionElement,
  selectedAnswer,
  reveal,
  handleAnswerSelection,
}) {
  return (
    <ul className="grid grid-cols-2 gap-8">
      {questionElement.answers.map((answer, index) => (
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
            } ${
              selectedAnswer === null &&
              "bg-blueGrad hover:bg-darkPurple hover:scale-105"
            }`}
            onClick={() => handleAnswerSelection(answer)}
            disabled={selectedAnswer !== null}
          >
            {answer}
          </button>
        </li>
      ))}
    </ul>
  );
}
