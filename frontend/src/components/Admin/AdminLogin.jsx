import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useInput from "../../hooks/useInput";
import { removeUserToken } from "../../util/removeItem";
import { redirectAdmin } from "../../util/redirects";
import quizApi from "../../api/api";
import Loading from "../Loading";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function AdminLogin() {
  // Disabling Confirm button if inputs are not valid
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Custom hook for name input
  const {
    enteredValue: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    onChangeHandler: nameChangeHandler,
    onBlurHandler: nameBlurHandler,
  } = useInput(
    (enteredName) =>
      enteredName.trim().length > 2 && enteredName.trim().length < 13
  );

  // Custom hook for password input
  const {
    enteredValue: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    onChangeHandler: passwordChangeHandler,
    onBlurHandler: passwordBlurHandler,
  } = useInput((enteredPassword) => enteredPassword.trim().length > 5);

  // Controls disable value depending on validity of the inputs
  useEffect(() => {
    if (nameIsValid && passwordIsValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [enteredName, enteredPassword]);

  // Function for sending credentials for login request
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    toast.dismiss();
    try {
      const response = await quizApi.post("/adminLogin", {
        username: enteredName,
        password: enteredPassword,
      });
      const data = response.data;
      setLoading(false);
      if (data.role === "administrator") {
        localStorage.setItem("admin", data.token);
        removeUserToken();
        toast.success("Login successful!");
        setTimeout(() => {
          redirectAdmin();
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      const errorData = error.response.data;
      toast.error(errorData.message || "Login failed.");
      console.error("Error during login:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-[90%] max-w-[450px] flex flex-col p-4 md:p-6 gap-4 rounded-[1rem] mt-12"
    >
      <TextField
        error={nameHasError}
        id={nameHasError ? "outlined-error-helper-text" : "outlined-basic"}
        helperText={
          nameHasError ? "Please enter a valid name (3-12 characters)" : ""
        }
        label="Name"
        variant="outlined"
        value={enteredName}
        onChange={nameChangeHandler}
        onBlur={nameBlurHandler}
      />
      <TextField
        error={passwordHasError}
        id={passwordHasError ? "outlined-error-helper-text" : "outlined-basic"}
        helperText={passwordHasError ? "Please enter a valid password." : ""}
        label="Password"
        type="password"
        variant="outlined"
        value={enteredPassword}
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
      />
      <Stack spacing={2} direction="row">
        <Button variant="contained" disabled={disabled} type="submit">
          Confirm
        </Button>
        <Button variant="contained" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </Stack>
      {loading && (
        <Loading className="absolute w-full h-full left-0 top-0 bg-black opacity-40 flex flex-col gap-4 items-center justify-center rounded-[1rem]" />
      )}
    </form>
  );
}
