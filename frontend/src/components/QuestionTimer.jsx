export default function QuestionTimer({ timer, points }) {
  return (
    <p className="text-black text-xl mb-12 flex flex-col gap-8 justify-center items-center">
      <span className="uppercase border border-black py-2 px-8">{`Awarding points: ${points}`}</span>
      <strong>
        {timer > 0
          ? `Time Remaining: ${timer} seconds`
          : `Preparing next question...`}
      </strong>
    </p>
  );
}
