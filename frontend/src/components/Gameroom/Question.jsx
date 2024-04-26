export default function Question({ questionElement }) {
  return (
    <p className="w-full flex justify-center items-center bg-darkPurple text-white text-xl p-4 mb-16 rounded text-center flex-wrap">
      {questionElement.question}
    </p>
  );
}
