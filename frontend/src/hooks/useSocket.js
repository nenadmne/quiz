import { useState } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000"; // Change the endpoint to match your backend

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  // Establish the socket connection when the component mounts
  useState(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);

    // Disconnect the socket when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
