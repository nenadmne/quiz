import { Tooltip } from "@mui/material";

export default function QuestionInfo({ item }) {
  return (
    <div className="w-[820px] flex flex-col gap-2">
      <div className="flex flex-row justify-between text-black text-center text-black">
        <Tooltip title="Question">
          <p className="cursor-pointer w-[648px] bg-white rounded px-2">
            {item.question}
          </p>
        </Tooltip>
        <Tooltip title="Points">
          <p className="cursor-pointer w-[150px] bg-white rounded">
            {item.points}
          </p>
        </Tooltip>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4">
          {item.answers.map((answer, index) => (
            <Tooltip key={index} title={`Answer ${index + 1}`}>
              <span className="bg-white text-black w-[150px] px-4 cursor-pointer text-center rounded">
                {answer}
              </span>
            </Tooltip>
          ))}
        </div>
        <div>
          <Tooltip title="Correct Answer" className="cursor-pointer">
            <p className="w-[150px] bg-white px-4 rounded text-center text-black">
              {item.correctAnswer}
            </p>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
