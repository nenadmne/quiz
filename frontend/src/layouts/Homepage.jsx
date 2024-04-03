import { useState, useEffect } from "react";
import io from "socket.io-client";

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
    <div>
      <h1>Online Multiplayer Quiz Game</h1>
      <button onClick={handleJoinGame} disabled={isJoining}>
        Join Game
      </button>
      {isLoading ? (
        <p>Waiting for players to join...</p>
      ) : (
        <>
          {isJoining ? (
            <p>Waiting for other player...</p>
          ) : (
            <>
              <h2>Players:</h2>
              <ul>
                {players.map((player, index) => (
                  <li key={index}>
                    {player.name} - Score: {player.score}
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Homepage;
