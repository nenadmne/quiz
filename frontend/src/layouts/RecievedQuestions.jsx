import { useState, useEffect } from "react";

import Loading from "../components/Loading";
import QuestionItem from "../components/RecievedQuestions/QuestionItem";

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

  const deleteHandler = async (itemId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/deleteQuestion/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete question");
      }
      await recievedQuestions();
    } catch (error) {
      console.error("Error:", error);
      throw new Error("deleteHandler: An error occurred");
    }
  };

  const addHandler = async (questionData, itemId) => {
    try {
      const response = await fetch("http://localhost:4000/addQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questionData }),
      });

      if (!response.ok) {
        throw new Error("Failed to add question");
      }
      await deleteHandler(itemId)
      await recievedQuestions();
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Add question: An error occurred");
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
              <QuestionItem
                item={item}
                key={item._id}
                deleteHandler={deleteHandler}
                addHandler={addHandler}
              />
            ))}
          </ul>
        </section>
      )
    );
}
