import { useEffect, useState, useRef } from "react";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CircleIcon from "@mui/icons-material/Circle";

import useSocket from "../hooks/useSocket";
import { getAnon, getUsername } from "../util/getItem";

export default function ChatComponent() {
  const [open, setOpen] = useState(false);
  const [sentMessage, setSentMessage] = useState("");
  const [returnedMessages, setReturnedMessages] = useState([]);
  const [users, setUsers] = useState(0);
  const chatRef = useRef();

  const socket = useSocket();
  const username = getUsername();

  // Chat users name --> Either username or anonymous
  useEffect(() => {
    if (username === "0" || !username) {
      const randomNumber = Math.floor(Math.random() * 100000);
      const generatedUsername = `anon_${randomNumber}`;
      localStorage.setItem("anon", generatedUsername);
    }
  }, [username]);

  const anon = getAnon();

  // Input handler
  const messageChangeHandler = (event) => {
    setSentMessage(event.target.value);
  };

  // Message data that stores message and its user --> emited to socket
  const messageData = {
    message: sentMessage,
    user: username !== null ? username : anon,
  };

  // Function for sending message button
  const messageSendHandler = async (event) => {
    event.preventDefault();
    if (sentMessage.trim() !== "") {
      socket.emit("chatMessage", messageData);
      setSentMessage("");
    }
  };

  // Handling users count and emiting chat messages to all users
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

  // Handling chat scrolling to be on last message always
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messageData]);

  return (
    <div className="absolute left-[2rem] bottom-[7rem] lg:bottom-[10rem] bg-transparent rounded-full bg-darkPurple flex justify-center items-center w-[4rem] h-[4rem] hover:cursor-pointer">
      <Tooltip title={`${open ? "close chat" : "open chat"}`}>
        <Button className="w-full" onClick={() => setOpen(!open)}>
          <MailOutlineIcon sx={{ fontSize: "2rem", color: "white" }} />
        </Button>
      </Tooltip>
      {open && (
        <div className="absolute w-[320px] sm:w-[350px] h-[400px] bg-blueGrad left-0 bottom-[5rem] rounded-[1rem] flex flex-col justify-end p-4 gap-4 hover:cursor-default">
          <div className="w-full flex flex-row items-center justify-center gap-2">
            <CircleIcon sx={{ color: "green", fontSize: "1.25rem" }} />
            <p className="text-white">{`Users online: ${users}`}</p>
          </div>
          <div
            className="flex rounded-lg overflow-hidden gap-2 bg-white grow flex flex-col w-full h-full p-1 overflow-y-scroll break-words"
            ref={chatRef}
          >
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
            <input
              className="grow bg-white rounded-lg h-full p-2 text-sm"
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
