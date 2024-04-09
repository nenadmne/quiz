import { useEffect } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000"; // Change the endpoint to match your backend

let socket = null;

const useSocket = () => {
  useEffect(() => {
    // Create the socket instance if it doesn't exist
    if (!socket) {
      socket = io(ENDPOINT);
    }
  }, []);

  return socket;
};

export default useSocket;
