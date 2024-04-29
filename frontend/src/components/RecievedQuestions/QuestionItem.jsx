import QuestionInfo from "./QuestionItem/QuestionInfo";
import ActionButtons from "./QuestionItem/ActionButtons";

export default function QuestionItem({ item }) {
  return (
    <li className="flex flex-col gap-4 border p-2 bg-darkPurple rounded-xl">
      <div className="flex flex-row justify-between items-center">
        <QuestionInfo item={item} />
        <ActionButtons />
      </div>
    </li>
  );
}
