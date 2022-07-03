import React, { useEffect } from 'react'
import { io } from "socket.io-client";

function Game() {

  useEffect(() => {
    const socket = io('http://localhost:3001');

    return () => socket.disconnect();
  }, [])
  
  return (
    <div>Game screen</div>
  )
}

export default Game