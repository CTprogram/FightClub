
import * as React from "react";
import Navbar from "./components/Navbar/Navbar";
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
import { ToastProvider } from "react-toast-notifications";

function App() {
  const ctx = React.useContext(myContext);
  const user = ctx.userObject;

  return (
    <div>
      <SocketContext.Provider value={socket}>
        <ToastProvider placement="bottom-center" transitionDuration={50}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route index element={<MainPage />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route element={<ProtectedRoute />}>
                <Route path="game" element={<Game />} />
                <Route path="home" element={<HomePage user={user} />} />
              </Route>
              <Route path="forgotPassword" element={<ForgotPassword />} />
              <Route path="resetPassword" element={<ResetPassword />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </SocketContext.Provider>
    </div>
  );
}
export default App;
