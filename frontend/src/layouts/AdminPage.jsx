import { useEffect, useState } from "react";
import { Form, Link } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

const tabs = [
  { to: "/administrator?addQuestion", text: "ADD QUESTION" },
  { to: "/administrator?recievedQuestions", text: "RECIEVED QUESTIONS" },
];

export default function AdminPage() {
  const [answerValues, setAnswerValues] = useState([]); // State to store answer values
  const [location, setLocation] = useState(null);

  const handleAnswerChange = (event, index) => {
    const newAnswerValues = [...answerValues];
    newAnswerValues[index] = event.target.value;
    setAnswerValues(newAnswerValues);
  };

  const linkHandler = () => {
    setLocation(window.location.href);
  }

  return (
    <section className="w-full h-full flex flex-col items-center gap-8 bg-blueGrad p-12">
      <div className="flex flex-row">
        {tabs.map((tab, index) => (
          <Link
            onClick={linkHandler}
            key={index}
            to={tab.to}
            className={`px-8 py-4 rounded-xl hover:bg-darkPurple cursor-pointer text-white ${
              location && location.includes(tab.to) ? "bg-darkPurple" : ""
            }`}
          >
            {tab.text}
          </Link>
        ))}
      </div>
      <Form
        method="POST"
        className="w-content flex flex-col justify-center items-center gap-8 p-8 bg-white rounded-xl"
      >
        <h1 className="uppercase text-xl">
          <strong>Add question</strong>
        </h1>
        <TextField
          label="Question"
          variant="outlined"
          className="w-full"
          name="question"
        />
        <div className="grid grid-cols-2 gap-4 w-full">
          {[1, 2, 3, 4].map((item, index) => (
            <TextField
              key={index}
              label={`Answer ${item}`}
              variant="outlined"
              name={`answer${item}`}
              onChange={(event) => handleAnswerChange(event, index)}
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
              />
            )}
          />
          <TextField label="Points" variant="outlined" name="points" />
        </div>

        <Button type="submit" variant="contained">
          Submit question
        </Button>
      </Form>
    </section>
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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred");
  }
};
