import CircularProgress from "@mui/material/CircularProgress";

export default function Loading({ className, color }) {
  return (
    <div className={className}>
      <CircularProgress
        disableShrink
        sx={{ color: `${color ? "black" : "white"}` }}
      />
      <span className={`text-xl ${color || "text-white"}`}>Loading...</span>
    </div>
  );
}
