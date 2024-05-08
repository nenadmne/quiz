import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import Loading from "../components/Loading";
import QuestionItem from "../components/RecievedQuestions/QuestionItem";
import quizApi from "../api/api";

import EngineeringIcon from "@mui/icons-material/Engineering";

export default function RecievedQuestions() {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetching suggested questions
  const recievedQuestions = async () => {
    try {
      const response = await quizApi.get("/recievedQuestions");
      const data = response.data;
      const questions = data.questions;
      setQuestions(questions);
    } catch (error) {
      console.error("Error:", error);
      throw new Error(
        error.response.data.message || "Failed to fetch suggested questions"
      );
    }
  };

  // Delete suggested question
  const deleteHandler = async (itemId) => {
    setLoading(true);
    try {
      const response = await quizApi.delete(`/deleteQuestion/${itemId}`);
      await recievedQuestions();
      setLoading(false);
      toast.success("Successfully deleted question!");
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      toast.error(error.response.data.message);
      throw new Error(
        error.response.data.message || "Failed to delete question"
      );
    }
  };

  // Moving suggested question to question collection and removing it from suggested question
  const addHandler = async (questionData, itemId) => {
    setLoading(true);
    try {
      const response = await quizApi.post("/addQuestion", { questionData });
      const deleteResponse = await quizApi.delete(`/deleteQuestion/${itemId}`);
      await recievedQuestions();
      setLoading(false);
      toast.success("Successfully submitted question!");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
      throw new Error(error.response.data.message || "Add question: An error occurred");
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
          <section className="w-full lg:w-[1000px] max-h-[600px] lg:max-h-[450px] overflow-y-scroll">
            <ul className="bg-greyGrad flex flex-col sm:p-4 lg:p-8 gap-4 md:gap-8 rounded-[1rem] text-white">
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
