import AnswerList from "../components/Gameroom/AnswerList";
import Question from "../components/Gameroom/Question";
import Logo from "../assets/logo.png";

export default function Test() {
  const questionElement = {
    _id: "661678a3d0088a55f05c44d7",
    question:
      "Which defender achieved both an assist and earned 3 Bonus Points in Ga…",
    answers: ["Ake", "Wan-Bissaka", "Saliba", "Chilwell"],
    correctAnswer: "Wan-Bissaka",
    points: "2",
  };

  return (
    <div className="w-full h-full gap-8 flex flex-col items-center bg-blackGrad pt-8">
      <>
        <div className="w-[800px] p-8 2xl:p-12 flex justify-center items-center flex-col bg-greyGrad rounded-xl shadow-md shadow-black">
          <Question questionElement={questionElement} />
          <ul className="w-full grid grid-cols-2 gap-4 2xl:gap-8">
            {questionElement.answers.map((answer, index) => {
              return (
                <li key={index} className="w-full">
                  <button>{answer}</button>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    </div>
  );
}
