import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import Loading from "../components/Loading";
import QuestionItem from "../components/RecievedQuestions/QuestionItem";

import EngineeringIcon from "@mui/icons-material/Engineering";

export default function RecievedQuestions() {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetching suggested questions
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

  // Delete suggested question
  const deleteHandler = async (itemId) => {
    setLoading(true);
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
      setLoading(false);
      toast.success("Successfully deleted question!");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error);
      throw new Error("deleteHandler: An error occurred");
    }
  };

  // Moving suggested question to question collection and removing it from suggested question
  const addHandler = async (questionData, itemId) => {
    setLoading(true);
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
      const deleteResponse = await fetch(
        `http://localhost:4000/deleteQuestion/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!deleteResponse.ok) {
        throw new Error("Failed to delete question");
      }
      await recievedQuestions();
      setLoading(false);
      toast.success("Successfully submitted question!");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error);
      throw new Error("Add question: An error occurred");
    }
  };

  // Fetching questions on mount
  useEffect(() => {
    recievedQuestions();
  }, []);

  if (questions === null) {
    return (
      <Loading className="absolute w-full h-full flex flex-col gap-4 items-center justify-center" />
    );
  } else
    return (
      <>
        {questions && questions.length > 0 && (
          <section className="w-[1000px] max-h-[450px] overflow-y-scroll">
            <ul className="bg-greyGrad flex flex-col p-8 gap-8 rounded-[1rem] text-white">
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
        )}
        {questions.length === 0 && (
          <div className="flex flex-col gap-4 items-center justify-center px-8 pt-4 bg-white rounded-xl">
            <p className="uppercase italic font-bold">
              There is no suggested questions at the moment...
            </p>
            <EngineeringIcon style={{ fontSize: "10rem" }} />
          </div>
        )}
        <div className="absolute w-full h-fit top-0 right-0 z-10">
          <ToastContainer
            style={{
              fontSize: "0.75rem",
              width: "fit-content",
              height: "fit-content",
            }}
          />
        </div>
        {loading && (
          <Loading className="absolute w-full h-full flex flex-col gap-4 items-center justify-center bg-black opacity-70" />
        )}
      </>
    );
}
