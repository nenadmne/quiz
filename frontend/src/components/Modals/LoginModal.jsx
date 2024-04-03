import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import useInput from "../../hooks/useInput";

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

export default function LoginModal({ open, handleClose }) {
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
            variant="outlined"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          <Stack spacing={2} direction="row">
            <Button variant="contained" disabled={disabled}>
              Confirm
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}
