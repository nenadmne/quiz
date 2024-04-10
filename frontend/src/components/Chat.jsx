import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

export default function ChatComponent() {
  const [open, setOpen] = useState(false);
  const [sentMessage, setSentMessage] = useState("");
  const [returnedMessages, setReturnedMessages] = useState([]);
  const socket = useSocket();
  const username = localStorage.getItem("username");
  const user = username ? username : `anonymous`;

  const messageChangeHandler = (event) => {
    setSentMessage(event.target.value);
  };

  const messageSendHandler = async () => {
    if (sentMessage.trim() !== "") {
      socket.emit("chatMessage", sentMessage);
    }
    const messageData = {
      message: sentMessage,
      user: user,
    };
    try {
      const response = await fetch("http://localhost:4000/chatMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageData }),
      });

      if (!response.ok) {
        throw new Error("Failed to add question");
      }
      await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw new Error("An error occurred");
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("chatMessage", (message) => {
        setReturnedMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  return (
    <div className="absolute left-[3rem] bottom-[10rem] bg-transparent rounded-full bg-darkPurple flex justify-center items-center w-[4rem] h-[4rem]">
      <Tooltip title={`${open ? "close chat" : "open chat"}`}>
        <Button className="w-full" onClick={() => setOpen(!open)}>
          <MailOutlineIcon sx={{ fontSize: "2rem", color: "white" }} />
        </Button>
      </Tooltip>
      {open && (
        <div className="absolute w-[400px] h-[600px] bg-blueGrad left-0 bottom-[5rem] rounded-[1rem] flex flex-col justify-end p-4 gap-4">
          <div className="flex rounded-lg overflow-hidden gap-2 bg-white grow flex flex-col w-full h-full">
            {returnedMessages.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
          <div className="flex flex-row overflow-hidden gap-2">
            <TextField
              className="grow p-1 bg-white p-1 rounded-lg"
              variant="outlined"
              size="small"
              onChange={messageChangeHandler}
            />
            <Button
              className="bg-darkPurple text-white w-[5rem] p-1"
              variant="contained"
              sx={{ borderRadius: "0.5rem" }}
              onClick={messageSendHandler}
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
