export default function QuestionTimer({ timer, points }) {
  return (
    <p className="text-black text-xl mb-6 2xl:mb-12 flex flex-col gap-4 justify-center items-center">
      <span className="uppercase px-8 py-2 px-8 bg-dark bg-lineGrad text-white text-shadow shadow-md shadow-[grey] rounded-xl">
        {`Awarding points: ${points}`}
      </span>
      <strong className="text-shadow text-white tracking-[1px]">
        {timer > 0
          ? `Time Remaining: ${timer} seconds`
          : `Preparing next question...`}
      </strong>
    </p>
  );
}
