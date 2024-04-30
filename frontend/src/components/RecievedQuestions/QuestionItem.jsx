import QuestionInfo from "./QuestionItem/QuestionInfo";
import ActionButtons from "./QuestionItem/ActionButtons";

export default function QuestionItem({ item, deleteHandler, addHandler }) {
  const question = {
    question: item.question,
    answers: [
      item.answers[0],
      item.answers[1],
      item.answers[2],
      item.answers[3],
    ],
    correctAnswer: item.correctAnswer,
    points: item.points,
  };
  return (
    <li className="flex flex-col gap-4 border p-4 bg-darkPurple rounded-xl">
      <div className="flex flex-row justify-between items-center">
        <QuestionInfo item={item} />
        <ActionButtons
          deleteHandler={() => deleteHandler(item._id)}
          addHandler={() => addHandler(question, item._id)}
        />
      </div>
    </li>
  );
}
