export default function QuestionTimer({ timer }) {
  return (
    <p className="text-black text-xl font-bold mb-12">
      {timer > 0
        ? `Time Remaining: ${timer} seconds`
        : `Preparing next question...`}
    </p>
  );
}
