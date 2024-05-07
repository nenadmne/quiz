export default function Question({ questionElement }) {
  return (
    <p className="w-full flex justify-center items-center bg-darkPurple text-white text-lg md:text-xl p-2 sm:p-4 mb-8 2xl:mb-16 rounded text-center flex-wrap text-shadow shadow-md">
      {questionElement.question}
    </p>
  );
}
