import io from "socket.io-client";
import React from "react";
import { getExpressBaseURI } from "./constants";

export const socket = io('http://localhost',{
    path: '/mysocket'
})
export const SocketContext = React.createContext();
