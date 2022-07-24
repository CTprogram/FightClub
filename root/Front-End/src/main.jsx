import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
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
import Context from "./utils/context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Context>
      <App/>
    </Context>
  </React.StrictMode>
);

