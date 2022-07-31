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
const menuItems = ["Home", "Leaderboard"];
const profileItems = ["Account", "Logout"];
import { socket, SocketContext } from "./utils/socket";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import MainPage from "./components/MainPage/MainPage";
import Game from "./components/game/Game";
import HomePage from "./components/HomePage/HomePage";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import ProtectedRoute from "./components/auth/Protected";
import { myContext } from "./utils/context";
import { ToastProvider} from 'react-toast-notifications';

function App() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const ctx = React.useContext(myContext);
  const user = ctx.userObject;

  return (
    <div>
      <Navbar user={user} anchorElUser={anchorElUser} setAnchorElUser={setAnchorElUser}/>
      <SocketContext.Provider value={socket}>
        <ToastProvider placement="bottom-center" transitionDuration={50}>
          <BrowserRouter>
            <Routes>
              <Route index element={<MainPage />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route element={<ProtectedRoute />}>
                <Route path="game" element={<Game />} />
                <Route path="home" element={<HomePage user={user} />} />
              </Route>
              <Route path="forgetPassword" element={<ForgotPassword />} />
              <Route path="resetPassword" element={<ResetPassword />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </SocketContext.Provider>
    </div>
  );
}
export default App;
