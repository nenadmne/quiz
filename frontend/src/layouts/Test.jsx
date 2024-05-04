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
        <div className="w-[52rem] flex flex-row justify-between items-end">
          <div className="text-white flex flex-col justify-center items-center gap-2">
            <div class="text-white flex flex-col justify-center items-center gap-8">
              <strong class="text-2xl w-48 flex justify-center items-center">
                Player Name
              </strong>
              <div class="text-4xl">Score</div>
            </div>
          </div>
          <img
            src={Logo}
            alt="logo image"
            className="w-[8rem] 2xl:w-[10rem] top-[1rem] bg-greyGrad rounded-xl"
          />
          <div className="text-white flex flex-col justify-center items-center gap-2">
            <strong className="text-2xl w-[12rem] 2xl:text-3xl 2xl:w-[15rem] flex justify-center items-center">
              Player Name
            </strong>
            <div className="text-4xl 2xl:text-5xl"> Score </div>
          </div>
        </div>

        <div className="w-[800px] p-8 2xl:p-12 flex justify-center items-center flex-col bg-greyGrad rounded-xl">
          <p className="text-black text-xl mb-6 2xl:mb-12 flex flex-col gap-4 justify-center items-center">
            <span className="uppercase border border-black py-2 px-8">
              Awarding points: 2
            </span>
            <strong> Time Remaining: 5 seconds</strong>
          </p>
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
