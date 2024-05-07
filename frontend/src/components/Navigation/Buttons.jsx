import Button from "@mui/material/Button";

export default function Buttons({ handleLoginOpen, handleSigninOpen }) {
  return (
    <>
      <Button
        sx={{ marginRight: 2 }}
        color="inherit"
        variant="outlined"
        onClick={handleLoginOpen}
      >
        Login
      </Button>
      <Button color="inherit" variant="outlined" onClick={handleSigninOpen}>
        Sign up
      </Button>
    </>
  );
}
