import { Tooltip } from "@mui/material";

export default function QuestionInfo({ item }) {
  return (
    <div className="w-full lg:w-[820px] flex flex-col gap-8 sm:gap-4">
      <div className="w-full flex flex-row gap-2 sm:gap-4 lg:gap-0 lg:justify-between text-black text-center text-black">
        <Tooltip title="Question">
          <p className="flex flex-col items-center cursor-pointer w-full lg:w-[648px] bg-white rounded p-1">
            <span className="text-sm italic"> Question </span>
            <span className="font-bold">{item.question}</span>
          </p>
        </Tooltip>
        <Tooltip title="Points">
          <p className="flex flex-col items-center justify-center cursor-pointer w-[150px] bg-white rounded p-1">
            <span className="italic text-sm w-full"> Points </span>
            <span className="text-center rounded-full font-bold w-[150px]">
              {item.points}
            </span>
          </p>
        </Tooltip>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-8 sm:gap-4 lg:gap-0">
        <div className="grid grid-rows md:grid-cols-2 w-full lg:w-[648px] gap-2 sm:gap-4">
          {item.answers.map((answer, index) => (
            <Tooltip key={index} title={`Answer ${index + 1}`}>
              <p className="flex flex-col bg-white text-black p-1 cursor-pointer text-center rounded text-wrap">
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
