import { useState } from "react";
import { Form } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

export default function AdminQuestionForm() {
  const [answerValues, setAnswerValues] = useState([]); // State to store answer values

  const handleAnswerChange = (event, index) => {
    const newAnswerValues = [...answerValues];
    newAnswerValues[index] = event.target.value;
    setAnswerValues(newAnswerValues);
  };

  const submitHandler = () => {
    toast.success("Question submitted!");
    setTimeout(() => {
      window.location.href = "/administrator/add-question";
    }, 2000);
  };

  return (
    <>
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
        className="w-content flex flex-col justify-center items-center gap-8 p-8 bg-white rounded-xl"
        onSubmit={submitHandler}
      >
        <h1 className="uppercase text-xl">
          <strong>Add question</strong>
        </h1>
        <TextField
          label="Question"
          variant="outlined"
          className="w-full"
          name="question"
          required
        />
        <div className="grid grid-cols-2 gap-4 w-full">
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
        <div className="grid grid-cols-2 gap-4">
          <Autocomplete
            disablePortal
            options={answerValues}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Correct Answer"
                name="correctAnswer"
                required
              />
            )}
          />
          <TextField label="Points" variant="outlined" name="points" required />
        </div>

        <Button type="submit" variant="contained">
          Submit question
        </Button>
      </Form>
    </>
  );
}

export const addQuestionAction = async ({ request }) => {
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
    const response = await fetch("https://quiz-wy28.onrender.com/addQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ questionData }),
    });

    if (!response.ok) {
      throw new Error("Failed to add question");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred");
  }
};
