import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { socket, SocketContext } from "./utils/socket";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider>
  </React.StrictMode>
);
