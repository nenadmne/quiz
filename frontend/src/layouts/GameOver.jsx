import Logo from "../assets/logo.png";
import Confetti from "../components/Confetti/Confetti";

import Button from "@mui/material/Button";

export default function GameOver({ players }) {
  const winner = players.reduce((prevPlayer, currentPlayer) => {
    return currentPlayer.score > prevPlayer.score ? currentPlayer : prevPlayer;
  });

  const draw =
    players.filter((player) => player.score === winner.score).length === 2;

  const handleButton = () => {
    window.location.href = "/";
  };

  return (
    <div className="w-full h-full flex bg-blackGrad pt-8 justify-center">
      <div className="h-fit flex flex-col bg-greyGrad pb-4 px-4 rounded justify-center items-center">
        <img
          src={Logo}
          alt="logo image"
          className="w-[10rem] bg-darkBlue rounded-xl"
        />
        {winner && !draw && (
          <div className="w-[80%] border border-black text-[1.75rem] w-full flex flex-row items-center justify-center gap-2">
            <span> The winner is </span>
            <strong>{winner.name}</strong>
          </div>
        )}
        {draw && (
          <div className="w-[80%] border border-black text-[1.75rem] w-full flex flex-row items-center justify-center gap-2">
            Draw!
          </div>
        )}
        <div className="w-fit h-fit flex flex-row gap-4 py-8 rounded justify-between items-center">
          <div className="w-[200px] flex flex-col p-4 bg-blueGrad text-white items-center justify-center gap-4 rounded">
            <p className="text-[1.5rem]">{players[0].name || "User left"}</p>
            <strong className="text-[3rem]">{players[0].score || ""}</strong>
          </div>
          <div className="w-[200px] flex flex-col p-4 bg-blueGrad text-white items-center justify-center gap-4 rounded">
            <p className="text-[1.5rem]">{players[1].name || "User left"}</p>
            <strong className="text-[3rem]">{players[1].score || ""}</strong>
          </div>
        </div>
        {!draw && (
          <div>
            <Confetti />
          </div>
        )}
        <div>
          <Button
            variant="contained"
            sx={{
              marginTop: `${draw ? "0" : "2rem"}`,
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
