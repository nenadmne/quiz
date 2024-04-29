import { useState, useEffect } from "react";

import Loading from "../components/Loading";

import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/Done";
import CreateIcon from "@mui/icons-material/ModeEdit";
import { Tooltip } from "@mui/material";

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

  if (questions === null) {
    return (
      <div className="absolute w-full h-full flex items-center justify-center flex-col gap-8">
        <Loading />
      </div>
    );
  } else
    return (
      questions && (
        <section className="w-[1000px] max-h-[500px] overflow-y-scroll overflow-hidden">
          <ul className="bg-greyGrad flex flex-col p-4 gap-4 rounded text-white">
            {questions.map((item) => (
              <li
                key={item._id}
                className="flex flex-col gap-4 border p-2 bg-darkPurple rounded-xl"
              >
                <div className="flex flex-row justify-between items-center">
                  <div className="w-[820px] flex flex-col gap-2">
                    <div className="flex flex-row justify-between text-black text-center text-black">
                      <Tooltip title="Question">
                        <p className="cursor-pointer w-[648px] bg-white rounded px-2">
                          {item.question}
                        </p>
                      </Tooltip>
                      <Tooltip title="Points">
                        <p className="cursor-pointer w-[150px] bg-white rounded">
                          {item.points}
                        </p>
                      </Tooltip>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row gap-4">
                        {item.answers.map((answer, index) => (
                          <Tooltip key={index} title={`Answer ${index + 1}`}>
                            <span className="bg-white text-black w-[150px] px-4 cursor-pointer text-center rounded">
                              {answer}
                            </span>
                          </Tooltip>
                        ))}
                      </div>
                      <div>
                        <Tooltip
                          title="Correct Answer"
                          className="cursor-pointer"
                        >
                          <p className="w-[150px] bg-white px-4 rounded text-center text-black">
                            {item.correctAnswer}
                          </p>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2">
                    <Tooltip title="Edit question">
                      <CreateIcon style={{ cursor: "pointer" }} />
                    </Tooltip>
                    <Tooltip title="Accept question">
                      <CheckCircleIcon style={{ cursor: "pointer" }} />
                    </Tooltip>
                    <Tooltip title="Remove question">
                      <DeleteIcon style={{ cursor: "pointer" }} />
                    </Tooltip>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )
    );
}
