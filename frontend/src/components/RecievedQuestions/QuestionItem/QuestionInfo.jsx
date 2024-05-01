import { Tooltip } from "@mui/material";

export default function QuestionInfo({ item }) {
  return (
    <div className="w-[820px] flex flex-col gap-4">
      <div className="flex flex-row justify-between text-black text-center text-black">
        <Tooltip title="Question">
          <p className="flex flex-col items-center cursor-pointer w-[648px] bg-white rounded p-1">
            <span className="text-sm italic"> Question </span>
            <span className="font-bold">{item.question}</span>
          </p>
        </Tooltip>
        <Tooltip title="Points">
          <p className="flex flex-col items-center justify-center cursor-pointer w-[150px] bg-white rounded p-1">
            <span className="italic text-sm"> Points </span>
            <span className="flex items-center justify-center rounded-full font-bold">
              {item.points}
            </span>
          </p>
        </Tooltip>
      </div>
      <div className="flex flex-row justify-between">
        <div className="grid grid-cols-2 w-[648px] gap-4">
          {item.answers.map((answer, index) => (
            <Tooltip key={index} title={`Answer ${index + 1}`}>
              <p className="flex flex-col bg-white text-black w-full p-1 cursor-pointer text-center rounded text-wrap">
                <span className="italic text-sm">{`Answer ${index + 1}`}</span>
                <span className="font-bold"> {answer}</span>
              </p>
            </Tooltip>
          ))}
        </div>
        <div className="flex items-end justify-center">
          <Tooltip title="Correct Answer" className="cursor-pointer">
            <p className="flex flex-col w-[150px] bg-white p-1 rounded text-center text-black bg-green-100">
              <span className="italic text-sm">Correct answer </span>
              <span className="font-bold">{item.correctAnswer}</span>
            </p>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
