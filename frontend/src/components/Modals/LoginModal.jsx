import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import useInput from "../../hooks/useInput";
import Loading from "../Loading";
import { redirectHome } from "../../util/redirects";
import quizApi from "../../api/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "450px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

export default function LoginModal({ open, handleClose }) {
  // Disabling Confirm button if inputs are not valid
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

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

  // Login function for sending credentials and aquiring token from backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    toast.dismiss();

    try {
      const response = await quizApi.post("/login", {
        username: enteredName,
        password: enteredPassword,
      });
      const data = response.data;
      setLoading(false);
      if (data.role === "user") {
        localStorage.setItem("token", data.token);
        // Decode the token
        const decodedToken = jwtDecode(data.token);
        localStorage.setItem("username", decodedToken.username);
        toast.success("Login successful!");

        setTimeout(() => {
          handleClose();
          redirectHome();
        }, 1500);
      } else {
        setLoading(false);
        toast.error("Invalid user role");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoading(false);
      toast.error(error.response.data.message || "Login failed.");
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
            error={passwordHasError}
            id={
              passwordHasError ? "outlined-error-helper-text" : "outlined-basic"
            }
            helperText={
              passwordHasError ? "Please enter a valid password." : ""
            }
            label="Password"
            type="password"
            variant="outlined"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
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
        {loading && (
          <Loading className="absolute w-full h-full left-0 top-0 bg-black opacity-70 flex flex-col gap-2 items-center justify-center rounded-[1rem]" />
        )}
      </Box>
    </Modal>
  );
}
