import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import LoginModal from "./Modals/LoginModal";
import SinginModal from "./Modals/SingInModal";
import { ToastContainer } from "react-toastify";

export default function NavigationBar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const [signinOpen, setSinginOpen] = useState(false);
  const handleSigninOpen = () => setSinginOpen(true);
  const handleSigninClose = () => setSinginOpen(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="bg-[#1e1e1e]">
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button
            sx={{ marginRight: 2 }}
            color="inherit"
            variant="outlined"
            onClick={handleLoginOpen}
          >
            Login
          </Button>
          <Button
            sx={{ marginRight: 2 }}
            color="inherit"
            variant="outlined"
            onClick={handleSigninOpen}
          >
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
      {loginOpen && (
        <LoginModal open={loginOpen} handleClose={handleLoginClose} />
      )}
      {signinOpen && (
        <SinginModal open={signinOpen} handleClose={handleSigninClose} />
      )}
    </Box>
  );
}
