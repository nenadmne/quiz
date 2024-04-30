import { Tooltip } from "@mui/material";

export default function QuestionInfo({ item }) {
  return (
    <div className="w-[820px] flex flex-col gap-4">
      <div className="flex flex-row justify-between text-black text-center text-black">
        <Tooltip title="Question">
          <p className="flex items-center cursor-pointer w-[648px] bg-white rounded px-2">
            {item.question}
          </p>
        </Tooltip>
        <Tooltip title="Points">
          <p className="flex items-center justify-center cursor-pointer w-[150px] bg-white rounded p-2">
            <span className="flex items-center justify-center rounded-full border-black border-2 w-[2rem] font-bold">
              {item.points}
            </span>
          </p>
        </Tooltip>
      </div>
      <div className="flex flex-row justify-between">
        <div className="grid grid-cols-2 w-[648px] gap-4">
          {item.answers.map((answer, index) => (
            <Tooltip key={index} title={`Answer ${index + 1}`}>
              <p className="bg-white text-black w-full px-4 cursor-pointer text-center rounded text-wrap">
                {answer}
              </p>
            </Tooltip>
          ))}
        </div>
        <div className="flex items-end justify-center">
          <Tooltip title="Correct Answer" className="cursor-pointer">
            <p className="w-[150px] bg-white px-4 py-2 rounded text-center text-black bg-green-100">
              {item.correctAnswer}
            </p>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
