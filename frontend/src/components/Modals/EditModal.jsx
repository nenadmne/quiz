import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../Loading";
import quizApi from "../../api/api";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth:"700px",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
};

export default function EditModal({ open, handleClose, item }) {
  const [loading, setLoading] = useState(false);

  const [questionValue, setQuestionValue] = useState(item.question);
  const [answerValues, setAnswerValues] = useState(item.answers);
  const [correctValue, setCorrectValue] = useState(item.correctAnswer);
  const [pointsValue, setPointsValue] = useState(item.points);

  // Changin answers function
  const handleAnswerChange = (event, index) => {
    const newAnswerValues = [...answerValues];
    newAnswerValues[index] = event.target.value;
    setAnswerValues(newAnswerValues);
  };

  // Edit question function with put request
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const questionData = {
      question: questionValue,
      answers: answerValues,
      correctAnswer: correctValue,
      points: pointsValue,
    };

    try {
      const response = await quizApi.put("/recievedQuestion", {
        questionData,
        id: item._id,
      });

      if (response.status !== 200) {
        setLoading(false);
        throw new Error(response.data.message || "Failed to add question");
      }
      setLoading(false);
      toast.success("Successfully editted!");
      const responseData = response.data;
      handleClose();
    } catch (error) {
      toast.error(error);
      console.error("Error:", error);
      throw new Error("An error occurred");
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            method="POST"
            className="w-content flex flex-col justify-center items-center gap-4 md:gap-8 p-4 md:p-8 bg-white rounded-xl"
            onSubmit={submitHandler}
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
            <div className="grid grid-cols-2 gap-2 md:gap-4 w-full">
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
            <div className="grid grid-rows-1 sm:grid-cols-2 gap-2 md:gap-4 w-full">
              <Autocomplete
                disablePortal
                options={answerValues}
                value={correctValue}
                onChange={(event, newValue) => {
                  setCorrectValue(newValue); // Update state with the new value
                }}
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
          </form>
          {loading && (
            <Loading className="absolute top-0 w-full h-full rounded-xl flex items-center justify-center flex-col gap-4 bg-black opacity-70 z-999" />
          )}
        </Box>
      </Modal>
    </>
  );
}
