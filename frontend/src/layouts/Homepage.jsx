import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import NavigationBar from "../components/NavigationBar";
import JoinGameBtn from "../components/JoinGameBtn";
import Background from "../components/Background";

const ENDPOINT = "http://localhost:4000";

function Homepage() {
  const navigate = useNavigate();
  const [play, setPlay] = useState(false);
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false); // Track whether player is joining

  useEffect(() => {
    setPlay(true);
    setTimeout(() => {
      setPlay(false);
    }, 2800);

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
    const playerName = "Nenad";
    if (playerName) {
      setIsJoining(true); // Start the joining screen
      const socket = io(ENDPOINT, { transports: ["websocket"] }); // Specify transports
      socket.emit("join", playerName);
    }
    setPlay(true);

    setTimeout(() => {
      setPlay(false);
      navigate("/lobby");
    }, 2800);
  };

  console.log(play);

  return (
    <>
      <NavigationBar />
      <section className="w-full h-full flex flex-col justify-center items-center">
        <Background play={play} />
        {!play && <JoinGameBtn handleJoinGame={handleJoinGame} />}
      </section>
    </>
  );
}

export default Homepage;
