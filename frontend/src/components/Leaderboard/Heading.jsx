import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

export default function Heading() {
  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <MilitaryTechIcon
        style={{
          fontSize: "2.5rem",
          filter: "drop-shadow(rgba(0, 0, 0, 0.533333) 0.1em 0.1em 0.1em)",
        }}
      />
      <h1 className="text-[2rem] font-bold uppercase text-shadow">
        Leaderboard
      </h1>
      <MilitaryTechIcon
        style={{
          fontSize: "2.5rem",
          filter: "drop-shadow(rgba(0, 0, 0, 0.533333) 0.1em 0.1em 0.1em)",
        }}
      />
    </div>
  );
}
