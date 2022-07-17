import { useState } from "react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
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
import { UserContext } from "./utils/user";
const menuItems = ["Home", "Leaderboard"];
const profileItems = ["Account", "Logout"];
import { socket, SocketContext } from "./utils/socket";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/Signup";
import MainPage from "./components/MainPage/MainPage";
import Game from "./components/game/Game";
import HomePage from "./components/HomePage/HomePage";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import ProtectedRoute from "./components/auth/Protected";
import { myContext } from "./utils/context";

function App() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = React.useContext(myContext);
  
  return (
    <div>
      <Navbar user={user} anchorElUser={anchorElUser} />
      <SocketContext.Provider value={socket}>
            <BrowserRouter>
              <Routes>
                  <Route index element={user && user._id ? <HomePage/> : <MainPage />} />
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="game" element={<Game />} />
                  <Route path="home" element={<HomePage user={user}/>} />
                  <Route path="forgetPassword" element={<ForgotPassword />} />
                  <Route path="resetPassword" element={<ResetPassword />} />
              </Routes>
            </BrowserRouter>
      </SocketContext.Provider>
    </div>
  );
}
export default App;
