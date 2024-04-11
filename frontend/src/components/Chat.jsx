import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CircleIcon from "@mui/icons-material/Circle";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

export default function ChatComponent() {
  const [open, setOpen] = useState(false);
  const [sentMessage, setSentMessage] = useState("");
  const [returnedMessages, setReturnedMessages] = useState([]);
  const [users, setUsers] = useState(0);

  const socket = useSocket();
  const username = localStorage.getItem("username");
  const user = username
    ? username
    : `anon_${Math.floor(Math.random() * 100000) + 1}`;

  const messageChangeHandler = (event) => {
    setSentMessage(event.target.value);
  };

  const messageData = {
    message: sentMessage,
    user: user,
  };

  const messageSendHandler = async (event) => {
    event.preventDefault();
    if (sentMessage.trim() !== "") {
      socket.emit("chatMessage", messageData);
      setSentMessage("");
    }
  };

  useEffect(() => {
    if (socket) {
      socket.emit("connectedUsers");
      socket.on("connectedUsers", (connectedUsers) => {
        setUsers(connectedUsers);
      });
      socket.on("chatMessage", (message) => {
        setReturnedMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  return (
    <div
      onClick={() => setOpen(!open)}
      className="absolute left-[3rem] bottom-[10rem] bg-transparent rounded-full bg-darkPurple flex justify-center items-center w-[4rem] h-[4rem] hover:cursor-pointer"
    >
      <Tooltip title={`${open ? "close chat" : "open chat"}`}>
        <Button className="w-full">
          <MailOutlineIcon sx={{ fontSize: "2rem", color: "white" }} />
        </Button>
      </Tooltip>
      {open && (
        <div className="absolute w-[350px] h-[400px] bg-blueGrad left-0 bottom-[5rem] rounded-[1rem] flex flex-col justify-end p-4 gap-4">
          <div className="w-full flex flex-row items-center justify-center gap-2">
            <CircleIcon sx={{ color: "green", fontSize: "1.25rem" }} />
            <p className="text-white">{`Number of users online: ${users}`}</p>
          </div>
          <div className="flex rounded-lg overflow-hidden gap-2 bg-white grow flex flex-col w-full h-full p-1">
            <ul className="text-sm">
              {returnedMessages.map((item, index) => (
                <li key={index} className="p-0 m-0 text-[brown]">
                  <strong className="text-black">{`${item.user}: `}</strong>
                  {item.message}
                </li>
              ))}
            </ul>
          </div>
          <form className="flex flex-row overflow-hidden gap-2 p-0 m-0">
            <TextField
              className="grow p-1 bg-white p-1 rounded-lg"
              variant="outlined"
              size="small"
              onChange={messageChangeHandler}
              value={sentMessage}
            />
            <Button
              className="bg-darkPurple text-white w-[5rem] p-1"
              variant="contained"
              sx={{ borderRadius: "0.5rem" }}
              onClick={messageSendHandler}
              type="submit"
            >
              Send
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
