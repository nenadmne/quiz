import { useState } from "react";
import { removeAdminToken, removeUserToken } from "../../util/removeItem";
import { redirectHome } from "../../util/redirects";
import { getAdminToken, getUsername } from "../../util/getItem";

import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function LoggedState({ handleProfileOpen }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const username = getUsername();
  const adminToken = getAdminToken();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    removeUserToken();
    removeAdminToken();
    redirectHome();
  };

  return (
    <div className="h-full flex flex-row gap-2 sm:gap-4 justify-center items-center md:px-4 pt-2 md:pt-3 pb-2 md:pb-2">
      <button onClick={() => !adminToken && handleProfileOpen()}>
        <Typography className="flex flex-row gap-2 px-4 py-2 border border-black rounded-xl bg-white text-black">
          {!adminToken && <EmojiEventsIcon />}
          <strong className="italic">
            {adminToken ? "Administrator" : username}
          </strong>
        </Typography>
      </button>

      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        sx={{ padding: 0 }}
      >
        <AccountCircle sx={{ width: 48, height: 48 }} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ top: "3.5rem" }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
