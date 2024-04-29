import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/Done";
import CreateIcon from "@mui/icons-material/ModeEdit";

export default function RecievedQuestions() {
  const [questions, setQuestions] = useState(null);
  const data = useLoaderData();

  useEffect(() => {
    if (data) {
      setQuestions(data);
    }
  }, [data]);

  return (
    questions && (
      <section className="w-[600px]">
        <ul className="bg-greyGrad flex flex-col p-4 gap-4 rounded">
          {questions.map((item) => (
            <li key={item._id} className="flex flex-col gap-4 border p-2 border-black">
              <div className="flex flex-row justify-between items-center">
                <div className="w-[400px] flex flex-col gap-2">
                  <div className="flex flex-row justify-between">
                    <p>{item.question}</p>
                    <p>{item.points}</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-4">
                      {item.answers.map((answer) => (
                        <span>{answer}</span>
                      ))}
                    </div>
                    <div>{item.correctAnswer}</div>
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <CreateIcon style={{ cursor: "pointer" }} />
                  <CheckCircleIcon style={{ cursor: "pointer" }} />
                  <DeleteIcon style={{ cursor: "pointer" }} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    )
  );
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
