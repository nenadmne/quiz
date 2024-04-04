import { useState, useEffect } from "react";
import io from "socket.io-client";
import NavigationBar from "../components/NavigationBar";
import JoinGameBtn from "../components/JoinGameBtn";

const ENDPOINT = "http://localhost:4000";

function Homepage() {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false); // Track whether player is joining

  useEffect(() => {
    const socket = io(ENDPOINT, { transports: ["websocket"] }); // Specify transports to avoid polling

    // Handle updates to player list and player count
    socket.on("updatePlayers", (updatedPlayers, playerCount) => {
      setPlayers(updatedPlayers);
      setIsLoading(playerCount < 2);
    });

    socket.on("startGame", () => {
      setIsLoading(false); // Start the game
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleJoinGame = () => {
    const playerName = prompt("Enter your name:");
    if (playerName) {
      setIsJoining(true); // Start the joining screen
      const socket = io(ENDPOINT, { transports: ["websocket"] }); // Specify transports
      socket.emit("join", playerName);
    }
  };

  return (
    <>
      <NavigationBar />
      <section className="w-full h-full flex justify-center items-center">
        <JoinGameBtn handleJoinGame={handleJoinGame} />
      </section>
    </>
  );
}

export default Homepage;
