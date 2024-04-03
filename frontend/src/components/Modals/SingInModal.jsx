import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

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
          <TextField id="outlined-basic" label="Name" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
          />
          <Stack spacing={2} direction="row">
            <Button variant="contained"> Confirm </Button>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}
