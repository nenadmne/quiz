import { useLoaderData } from "react-router-dom";

export default function RecievedQuestions() {
  const data = useLoaderData();
  console.log(data);
  return <div>Recieved Questions</div>;
}

export const recievedQuestionsLoader = async () => {
  try {
    const response = await fetch("http://localhost:4000/recievedQuestions");
    if (!response.ok) {
      throw new Error("Failed to fetch suggested questions");
    }
    const data = await response.json();
    const questions = data.questions;
    return questions;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred");
  }
};
