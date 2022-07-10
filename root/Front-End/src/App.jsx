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
import Room from "./components/game/room/Room";
import Navbar from "./components/Navbar/Navbar";
const menuItems = ["Home", "Leaderboard"];
const profileItems = ["Account", "Logout"];

function App() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState({});

  return (
    <div>
      <Navbar user={user} anchorElUser={anchorElUser} />
      <Outlet />
    </div>
  );
}
export default App;
