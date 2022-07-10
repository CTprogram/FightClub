import { useState } from "react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Game from "./components/game/Game";
import HealthBar from "./components/game/gameUI/HealthBar";
import { Link, Outlet } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import axios from "axios";
import { formHelperTextClasses } from "@mui/material";
import styles from "./App.module.css";
import MainPage from "./components/MainPage/MainPage";

const menuItems = ["Home", "Leaderboard"];
const profileItems = ["Account", "Logout"];

function App() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState({});

  const openUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const closeUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className={styles.App}>
      <AppBar className={styles.Menu}>
        <Toolbar disableGutters className={styles.Menu}>
          <div className={styles.LogoContainer}>
            {/* <SportsMmaIcon className={styles.FightLogo} /> */}
            <div className={styles.LogoTitle}>Fight Club</div>
          </div>

          {user && user.username && (
            <Box className={styles.Menu}>
              {menuItems.map((item) => (
                <Button key={item} sx={{ my: 2, color: "white", display: "block" }}>
                  {item}
                </Button>
              ))}
            </Box>
          )}

          {user && user.username && (
            <Box className={styles.UserMenuContainer}>
              <Tooltip title="Open settings">
                <IconButton onClick={openUserMenu}>
                  <Avatar alt="" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                className={styles.userMenu}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={closeUserMenu}
              >
                {profileItems.map((item) => (
                  <MenuItem key={item} onClick={closeUserMenu}>
                    <Typography textAlign="center">{item}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <Typography variant="h6" className={styles.Username}>
                {user.username}
              </Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
}
export default App;
