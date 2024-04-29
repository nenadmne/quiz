import { useState, useEffect } from "react";

import Loading from "../components/Loading";

import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/Done";
import CreateIcon from "@mui/icons-material/ModeEdit";

export default function RecievedQuestions() {
  const [questions, setQuestions] = useState(null);

  const recievedQuestions = async () => {
    try {
      const response = await fetch("http://localhost:4000/recievedQuestions");
      if (!response.ok) {
        throw new Error("Failed to fetch suggested questions");
      }
      const data = await response.json();
      const questions = data.questions;
      setQuestions(questions);
    } catch (error) {
      console.error("Error:", error);
      throw new Error("An error occurred");
    }
  };

  useEffect(() => {
    recievedQuestions();
  }, []);

  console.log(questions);

  if (questions === null) {
    return <div className="absolute w-full h-full flex items-center justify-center flex-col gap-8"><Loading /></div>
  } else
    return (
      questions && (
        <section className="w-[600px]">
          <ul className="bg-greyGrad flex flex-col p-4 gap-4 rounded">
            {questions.map((item) => (
              <li
                key={item._id}
                className="flex flex-col gap-4 border p-2 border-black"
              >
                <div className="flex flex-row justify-between items-center">
                  <div className="w-[400px] flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                      <p>{item.question}</p>
                      <p>{item.points}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row gap-4">
                        {item.answers.map((answer, index) => (
                          <span key={index}>{answer}</span>
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
