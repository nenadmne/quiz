import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    question: "",
    answers: ["", "", "", ""],
    currentAnswer: "",
  });
  return (
    <section className="w-full h-full flex flex-col items-center gap-8 bg-blueGrad p-12">
      <form className="w-content flex flex-col justify-center items-center gap-8 p-8 bg-white rounded-xl">
        <h1 className="uppercase text-xl">
          <strong>Add question</strong>
        </h1>
        <TextField label="Question" variant="outlined" className="w-full" />
        <div className="grid grid-cols-2 gap-4">
          <TextField label="Answer 1" variant="outlined" name="answerOne" />
          <TextField label="Answer 2" variant="outlined" name="answerTwo" />
          <TextField label="Answer 3" variant="outlined" name="answerThree" />
          <TextField label="Answer 4" variant="outlined" name="answerFour" />
        </div>
        <TextField
          label="Current answer"
          variant="outlined"
          className="w-full"
        />
        <Button variant="contained"> Submit question </Button>
      </form>
    </section>
  );
}
