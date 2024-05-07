import QuestionInfo from "./QuestionItem/QuestionInfo";
import ActionButtons from "./QuestionItem/ActionButtons";

export default function QuestionItem({ item, deleteHandler, addHandler }) {
  const question = {
    question: item.question,
    answers: item.answers,
    correctAnswer: item.correctAnswer,
    points: item.points,
  };

  return (
    <li className="border p-4 bg-darkPurple rounded-xl">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-0 justify-between items-center">
        <QuestionInfo item={item} />
        <ActionButtons
          item={item}
          deleteHandler={() => deleteHandler(item._id)}
          addHandler={() => addHandler(question, item._id)}
        />
      </div>
    </li>
  );
}
