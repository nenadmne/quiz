import { useState } from "react";
import { Outlet } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import LoginModal from "../components/Modals/LoginModal";
import SinginModal from "../components/Modals/SingInModal";
import ProfileModal from "../components/Modals/ProfileModal";
import LoggedState from "../components/Navigation/LoggedState";
import Buttons from "../components/Navigation/Buttons";
import Hamburger from "../components/Navigation/Hamburger";
import { getUserToken } from "../util/getItem";

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

  const token = getUserToken();
  const adminToken = localStorage.getItem("admin");

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
            <Hamburger />
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            {!token && !adminToken ? (
              <Buttons
                handleLoginOpen={handleLoginOpen}
                handleSigninOpen={handleSigninOpen}
              />
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
