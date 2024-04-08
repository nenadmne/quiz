export default function Question({ questionElement }) {
  return (
    <p className="w-full flex justify-center items-center bg-darkPurple text-white text-xl py-4 mb-16 rounded">
      {questionElement.question}
    </p>
  );
}
