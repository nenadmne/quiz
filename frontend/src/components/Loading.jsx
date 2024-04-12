import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <>
      <CircularProgress disableShrink />
      <span className="text-xl text-white">Loading...</span>
    </>
  );
}
