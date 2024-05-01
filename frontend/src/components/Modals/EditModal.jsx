import { useState, useEffect } from "react";
import { Form } from "react-router-dom";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";

import { ToastContainer, toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
};

export default function EditModal({ open, handleClose, item }) {
  const [questionValue, setQuestionValue] = useState(item.question);
  const [answerValues, setAnswerValues] = useState(item.answers);
  const [pointsValue, setPointsValue] = useState(item.points);

  const handleAnswerChange = (event, index) => {
    const newAnswerValues = [...answerValues];
    newAnswerValues[index] = event.target.value;
    setAnswerValues(newAnswerValues);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Form
          method="POST"
          className="w-content flex flex-col justify-center items-center gap-8 p-8 bg-white rounded-xl"
        >
          <h1 className="uppercase text-xl">
            <strong>Edit question</strong>
          </h1>
          <TextField
            label="Question"
            variant="outlined"
            className="w-full"
            name="question"
            value={questionValue}
            onChange={(event) => setQuestionValue(event.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4 w-full">
            {answerValues.map((item, index) => (
              <TextField
                key={index}
                label={`Answer ${index + 1}`}
                variant="outlined"
                name={`answer${index + 1}`}
                onChange={(event) => handleAnswerChange(event, index)}
                value={item}
                required
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <Autocomplete
              disablePortal
              options={answerValues}
              value={item.correctAnswer}
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
              value={pointsValue}
              onChange={(event) => setPointsValue(event.target.value)}
              required
            />
          </div>

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
        <ToastContainer />
      </Box>
    </Modal>
  );
}