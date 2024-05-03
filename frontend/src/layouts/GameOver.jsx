import { useEffect, useState } from "react";
import Lottie from "lottie-react";

import Fireworks from "../assets/Fireworks.json";
import Loser from "../assets/Loser.json";
import Logo from "../assets/logo.png";

import Button from "@mui/material/Button";
import useSocket from "../hooks/useSocket";
import reloadHome from "../util/reloadHome";

export default function GameOver({ players, playersJoined }) {
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);

  const socket = useSocket();
  const username = localStorage.getItem("username");

  // Storing players stats into state so the track of their stats is not lost after they leave
  const [player1Name, setPlayer1Name] = useState(null);
  const [player2Name, setPlayer2Name] = useState(null);
  const [player1Score, setPlayer1Score] = useState(null);
  const [player2Score, setPlayer2Score] = useState(null);

  // Return to homepage button
  const handleButton = () => {
    reloadHome();
  };

  // Socket clean up function
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    // Defining state values, winner and draw logic when there was not a leaver during game
    if (players.length === 2) {
      const winner = players.reduce((prevPlayer, currentPlayer) => {
        return currentPlayer.score > prevPlayer.score
          ? currentPlayer
          : prevPlayer;
      });

      const draw =
        players.filter((player) => player.score === winner.score).length === 2;

      if (draw) {
        setDraw(draw);
      } else {
        setWinner(winner);
      }
      setPlayer1Name(players[0].name);
      setPlayer1Score(players[0].score);
      setPlayer2Name(players[1].name);
      setPlayer2Score(players[1].score);

      // To emit only once
      if (username === players[0].name) {
        socket.emit("gameOver");
      }
    }

    // Defining state values, winner and draw logic when there was a leaver during game. Leaver get instant loss
    if (players.length < 2) {
      const winner = playersJoined.filter((player) => player.name === username);
      setWinner(winner[0]);
      setPlayer1Name(playersJoined[0].name);
      setPlayer1Score(playersJoined[0].score);
      setPlayer2Name(playersJoined[1].name);
      setPlayer2Score(playersJoined[1].score);

      socket.emit("gameOver");
    }
  }, []);

  useEffect(() => {
    // Securing to call socket only once, handling the Win/Draw/Loss count
    if (username === players[0].name) {
      socket.on("gameOver", async (room) => {
        if (winner !== null && !draw) {
          const roomId = room;
          const winnerPlayer = winner;

          try {
            const response = await fetch("http://localhost:4000/gameOver", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                room: roomId,
                winner: winnerPlayer,
              }),
            });

            if (!response.ok) {
              throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error("Error:", error);
          }
        } else if (draw) {
          console.log("here i am");
          const drawedGame = draw;
          const roomId = room;
          try {
            const response = await fetch("http://localhost:4000/gameOver", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                draw: drawedGame,
                room: roomId,
              }),
            });

            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error("Error:", error);
          }
        }
      });
    }
  }, [winner, draw]);

  return (
    <div className="w-full h-full flex bg-blackGrad pt-8 justify-center">
      <div className="h-fit flex flex-col bg-greyGrad pb-6 px-8 rounded justify-center items-center">
        <img
          src={Logo}
          alt="logo image"
          className="w-[10rem] bg-darkBlue rounded-xl"
        />
        {winner && !draw && (
          <div className="border border-black text-[1.75rem] w-full flex flex-row items-center justify-center gap-2">
            <span> The winner is </span>
            <strong>{winner.name}</strong>
          </div>
        )}
        {draw && (
          <div className="border border-black text-[1.75rem] w-full flex flex-row items-center justify-center gap-2">
            Draw!
          </div>
        )}
        <div className="w-fit h-fit flex flex-row gap-4 py-8 rounded justify-between items-center">
          <div className="w-[200px] flex flex-col p-4 bg-blueGrad text-white items-center justify-center gap-4 rounded">
            <p className="text-[1.5rem]">{player1Name}</p>
            <strong className="text-[3rem]">{player1Score}</strong>
          </div>
          <div className="w-[200px] flex flex-col p-4 bg-blueGrad text-white items-center justify-center gap-4 rounded">
            <p className="text-[1.5rem]">{player2Name}</p>
            <strong className="text-[3rem]">{player2Score}</strong>
          </div>
        </div>
        {winner && winner.name === username && !draw && (
          <div className="absolute">
            <Lottie animationData={Fireworks} loop={true} />
          </div>
        )}
        {winner && winner.name !== username && !draw && (
          <div className="absolute top-[1rem] right-[1rem] w-[5rem] z-99">
            <Lottie animationData={Loser} loop={true} />
          </div>
        )}
        <div>
          <Button
            variant="contained"
            sx={{
              color: "white",
            }}
            onClick={handleButton}
            className="bg-blueGrad hover:opacity-80"
          >
            Back to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
