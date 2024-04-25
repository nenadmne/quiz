import { useState } from "react";
import { Form } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

export default function Questions() {
  const [answerValues, setAnswerValues] = useState([]); // State to store answer values

  const handleAnswerChange = (event, index) => {
    const newAnswerValues = [...answerValues];
    newAnswerValues[index] = event.target.value;
    setAnswerValues(newAnswerValues);
  };

  return (
    <section className="w-full h-full flex flex-col items-center gap-8 bg-blueGrad p-12">
      <Form
        method="POST"
        className="w-content flex flex-col justify-center items-center gap-8 p-8 bg-white rounded-xl"
      >
        <h1 className="uppercase text-xl">
          <strong>Submit question</strong>
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
                label="CorrectAnswer"
                name="correctAnswer"
              />
            )}
          />
          <TextField label="Points" variant="outlined" name="points" />
        </div>

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Form>
    </section>
  );
}
