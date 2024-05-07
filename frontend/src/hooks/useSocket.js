import { useEffect } from "react";
import io from "socket.io-client";

const ENDPOINT = import.meta.env.VITE_BASE_URL;

let socket = null;

const useSocket = () => {
  useEffect(() => {
    if (!socket) {
      socket = io(ENDPOINT);
    }
  }, []);

  return socket;
};

export default useSocket;
