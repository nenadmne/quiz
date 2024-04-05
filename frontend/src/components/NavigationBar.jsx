import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";

import LoginModal from "./Modals/LoginModal";
import SinginModal from "./Modals/SingInModal";

export default function NavigationBar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const [signinOpen, setSinginOpen] = useState(false);
  const handleSigninOpen = () => setSinginOpen(true);
  const handleSigninClose = () => setSinginOpen(false);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="bg-[#1e1e1e]">
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          {!token ? (
            <>
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
            </>
          ) : (
            <div className="h-full flex flex-col gap-1 justify-center items-center px-4 py-2">
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ padding: 0 }}
              >
                <AccountCircle sx={{ width: 34, height: 34 }} />
              </IconButton>
              <Typography>
                {" "}
                <strong>{username}</strong>
              </Typography>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          )}
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
