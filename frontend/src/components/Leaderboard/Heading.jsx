import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

export default function Heading() {
  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <MilitaryTechIcon style={{ fontSize: "2.5rem" }} />
      <h1 className="text-[2rem] font-bold uppercase">Leaderboard</h1>
      <MilitaryTechIcon style={{ fontSize: "2.5rem" }} />
    </div>
  );
}
