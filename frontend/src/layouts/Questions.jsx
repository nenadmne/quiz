import { useState } from "react";
import { Form } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { redirectQuestions } from "../util/redirects";
import quizApi from "../api/api";

export default function Questions() {
  const [answerValues, setAnswerValues] = useState([]); // State to store answer values

  const handleAnswerChange = (event, index) => {
    const newAnswerValues = [...answerValues];
    newAnswerValues[index] = event.target.value;
    setAnswerValues(newAnswerValues);
  };

  const submitHandler = () => {
    toast.success("Question submitted!");
    setTimeout(() => {
      redirectQuestions();
    }, 1500);
  };

  return (
    <section className="w-full h-full flex flex-col items-center gap-8 bg-blueGrad p-4 md:p-0">
      <div className="absolute w-full h-fit top-0 right-0 z-10">
        <ToastContainer
          style={{
            fontSize: "0.75rem",
            width: "fit-content",
            height: "fit-content",
          }}
        />
      </div>
      <Form
        method="POST"
        className="w-content flex flex-col justify-center items-center gap-8 p-4 md:p-8 bg-white rounded-xl md:mt-12"
        onSubmit={submitHandler}
      >
        <h1 className="uppercase text-xl">
          <strong>Submit question</strong>
        </h1>
        <TextField
          label="Question"
          variant="outlined"
          className="w-full"
          name="question"
          required
        />
        <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full">
          {[1, 2, 3, 4].map((item, index) => (
            <TextField
              key={index}
              label={`Answer ${item}`}
              variant="outlined"
              name={`answer${item}`}
              onChange={(event) => handleAnswerChange(event, index)}
              required
            />
          ))}
        </div>
        <div className="grid grid-rows-1 sm:grid-cols-2  gap-2 sm:gap-4 w-full">
          <Autocomplete
            disablePortal
            options={answerValues}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Correct Answer"
                name="correctAnswer"
                required
              />
            )}
          />
          <TextField
            label="Points"
            variant="outlined"
            name="points"
            required
            type="number"
          />
        </div>

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Form>
    </section>
  );
}

export const suggestQuestionAction = async ({ request }) => {
  const data = await request.formData();
  const questionData = {
    question: data.get("question"),
    answers: [
      data.get("answer1"),
      data.get("answer2"),
      data.get("answer3"),
      data.get("answer4"),
    ],
    correctAnswer: data.get("correctAnswer"),
    points: data.get("points"),
  };

  try {
    const response = await quizApi.post("/suggestQuestion", { questionData });
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error(error.response.data.message || "Failed to add suggestion");
  }
};
