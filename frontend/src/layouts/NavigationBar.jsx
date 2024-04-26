import { useState } from "react";
import { Outlet } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import LoginModal from "../components/Modals/LoginModal";
import SinginModal from "../components/Modals/SingInModal";
import ProfileModal from "../components/Modals/ProfileModal";
import LoggedState from "../components/Navigation/LoggedState";

export default function NavigationBar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const [signinOpen, setSinginOpen] = useState(false);
  const handleSigninOpen = () => setSinginOpen(true);
  const handleSigninClose = () => setSinginOpen(false);

  const [profileOpen, setProfileOpen] = useState(false);
  const handleProfileOpen = () => setProfileOpen(true);
  const handleProfileClose = () => setProfileOpen(false);

  const token = localStorage.getItem("token");

  const [hamburger, setHamburger] = useState(null);

  const handleHamburgerOpen = (event) => {
    setHamburger(event.currentTarget);
  };

  const handleHamburgerClose = () => {
    setHamburger(null);
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          position: "sticky",
          overflow: "hidden",
          zIndex: "2",
        }}
      >
        <AppBar position="static">
          <Toolbar className="bg-darkPurple">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleHamburgerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={hamburger}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(hamburger)}
              onClose={handleHamburgerClose}
              style={{ top: "3.5rem" }}
            >
              <MenuItem onClick={() => (window.location.href = "/")}>
                {" "}
                Home{" "}
              </MenuItem>
              <MenuItem
                onClick={() => (window.location.href = "/leaderboards")}
              >
                {" "}
                Leaderboards{" "}
              </MenuItem>
              <MenuItem onClick={() => (window.location.href = "/questions")}>
                {" "}
                Questions{" "}
              </MenuItem>
            </Menu>
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
              <LoggedState handleProfileOpen={handleProfileOpen} />
            )}
          </Toolbar>
        </AppBar>
        {loginOpen && (
          <LoginModal open={loginOpen} handleClose={handleLoginClose} />
        )}
        {signinOpen && (
          <SinginModal open={signinOpen} handleClose={handleSigninClose} />
        )}
        {profileOpen && (
          <ProfileModal open={profileOpen} handleClose={handleProfileClose} />
        )}
      </Box>
      <Outlet />
    </>
  );
}
