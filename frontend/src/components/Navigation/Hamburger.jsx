import { useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function Hamburger() {
  const [hamburger, setHamburger] = useState(null);

  const handleHamburgerOpen = (event) => {
    setHamburger(event.currentTarget);
  };

  const handleHamburgerClose = () => {
    setHamburger(null);
  };

  const menuItems = [
    { label: "Home", link: "/" },
    { label: "Leaderboards", link: "/leaderboards" },
    { label: "Questions", link: "/questions" },
  ];

  return (
    <>
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
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => (window.location.href = item.link)}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
