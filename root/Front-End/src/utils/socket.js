import io from "socket.io-client";
import React from "react";
import { getExpressBaseURI } from "./constants";

export const socket = io.connect(getExpressBaseURI());
export const SocketContext = React.createContext();
