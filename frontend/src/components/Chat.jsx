import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function ChatComponent() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute left-[3rem] bottom-[10rem] bg-transparent rounded-full bg-darkPurple flex justify-center items-center w-[4rem] h-[4rem]">
      <Tooltip title={`${open ? "close chat" : "open chat"}`}>
        <Button className="w-full" onClick={() => setOpen(!open)}>
          <MailOutlineIcon sx={{ fontSize: "2rem", color: "white" }} />
        </Button>
      </Tooltip>
      {open && (
        <div className="absolute w-[400px] h-[600px] bg-blueGrad left-0 bottom-[5rem] rounded-[1rem] flex flex-col justify-end p-4 gap-4">
          <div className="flex rounded-lg overflow-hidden gap-2 bg-white grow"></div>
          <div className="flex flex-row overflow-hidden gap-2">
            <TextField
              className="grow p-1 bg-white p-1 rounded-lg"
              variant="outlined"
              size="small"
            />
            <Button
              className="bg-darkPurple text-white w-[5rem] p-1"
              variant="contained"
              sx={{ borderRadius: "0.5rem" }}
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
