import React, { useEffect, useRef, useContext } from "react";
import { io } from "socket.io-client";
import { handleGameState } from "../../utils/gameUtils";
import { SocketContext } from "../../utils/socket";
let socket;
const Game = () => {
  const canvasRef = useRef(null);
  const socket = useContext(SocketContext);

  // useEffect(() => {
  //   // socket = io("http://localhost:3001");
  //   // return () => socket.disconnect();
  //   // handleGameState(state, canvas, ctx);
  // }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 576;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const handleGameSnapShot = (state) => {
      state = JSON.parse(state);
      handleGameState(state, canvas, ctx);
    };
    socket.on("gameSnapShot", handleGameSnapShot);

    return () => {
      socket.off("gameSnapShot", handleGameSnapShot);
    };
  }, [socket]);

  //socket effects
  // useEffect(() => {
  //   socket.on("hello", (data) => {
  //     console.log(data);
  //   });
  // }, [socket]);
  const handleKeyDown = (e) => {
    console.log("a");
    socket.emit("keyDown", e.key);
  };
  const handleKeyUp = (e) => {
    console.log("b");
    socket.emit("keyUp", e.key);
  };
  return (
    <div>
      <p>Game screen</p>
      <canvas tabIndex={0} ref={canvasRef} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
    </div>
  );
};

export default Game;
