import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { socket, SocketContext } from "./utils/socket";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/Signup";
import MainPage from "./components/MainPage/MainPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<MainPage />} />
            <Route path="/login" element={Login} />
            <Route path="/signup" element={SignUp} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  </React.StrictMode>
);
