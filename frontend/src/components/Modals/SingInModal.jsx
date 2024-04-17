import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import useInput from "../../hooks/useInput";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

export default function SinginModal({ open, handleClose }) {
  // Disabling Confirm button if inputs are not valid
  const [disabled, setDisabled] = useState(true);

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

  // Custom hook for email input
  const {
    enteredValue: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    onChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
  } = useInput(
    (enteredEmail) =>
      enteredEmail.trim().length > 0 && enteredEmail.includes("@")
  );

  // Custom hook for password input
  const {
    enteredValue: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    onChangeHandler: passwordChangeHandler,
    onBlurHandler: passwordBlurHandler,
  } = useInput((enteredPassword) => enteredPassword.trim().length > 5);

  // Custom hook for confirmed password input
  const {
    enteredValue: enteredConfirmedPassword,
    isValid: confirmedPasswordIsValid,
    hasError: confirmedPasswordHasError,
    onChangeHandler: confirmedPasswordChangeHandler,
    onBlurHandler: confirmedPasswordBlurHandler,
  } = useInput(
    (enteredConfirmedPassword) => enteredConfirmedPassword.trim().length > 5
  );

  // Controls disable value depending on validity of the inputs
  useEffect(() => {
    if (
      nameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      confirmedPasswordIsValid &&
      enteredPassword === enteredConfirmedPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [enteredName, enteredPassword, enteredConfirmedPassword, enteredEmail]);

  // Submit Sign up function
  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.dismiss();
    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: enteredName,
          email: enteredEmail,
          password: enteredPassword,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        // Decode the token
        const decodedToken = jwtDecode(data.token);
        localStorage.setItem("username", decodedToken.username);
        toast.success("Signup successful!");
        setTimeout(() => {
          handleClose();
          window.location.href = "/";
        }, 2000);
      } else {
        const errorData = await response.json(); // Parse error response body
        toast.error(errorData.message || "Signup failed."); // Display error message from server if available
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { my: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
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
            error={emailHasError}
            id={emailHasError ? "outlined-error-helper-text" : "outlined-basic"}
            helperText={emailHasError ? "Please enter a valid email" : ""}
            label="Email"
            variant="outlined"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          <TextField
            error={passwordHasError}
            id={
              passwordHasError ? "outlined-error-helper-text" : "outlined-basic"
            }
            helperText={
              passwordHasError
                ? "Please enter a valid password (min 6 characters)"
                : ""
            }
            label="Password"
            type="password"
            variant="outlined"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          <TextField
            error={confirmedPasswordHasError}
            id={
              confirmedPasswordHasError
                ? "outlined-error-helper-text"
                : "outlined-basic"
            }
            helperText={
              confirmedPasswordHasError
                ? "Confirmed password doesn't match"
                : ""
            }
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={enteredConfirmedPassword}
            onChange={confirmedPasswordChangeHandler}
            onBlur={confirmedPasswordBlurHandler}
          />
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              disabled={disabled}
              onClick={handleSubmit}
              type="submit"
            >
              Confirm
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Box>
        <ToastContainer />
      </Box>
    </Modal>
  );
}
