import React, { useEffect, useRef, useContext, useCallback, useState } from "react";
import { io } from "socket.io-client";
import { handleGameState } from "../../utils/gameUtils";
import { SocketContext } from "../../utils/socket";
import styles from "./Game.module.css";
import HealthBar from "./gameUI/HealthBar";

const Game = () => {
  const canvasRef = useRef(null);
  const socket = useContext(SocketContext);
  const [currentPlayerHealth, setCurrentPlayerHealth] = useState(1);
  const [currentEnemyHealth, setCurrentEnemyHealth] = useState(1);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [load, setLoad] = useState(false);

  const handleGameSnapShot = useCallback((state) => {
    if (!load) {
      setLoad(true);
    }
    state = JSON.parse(state);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    handleGameState(state, canvas, ctx);
    setCurrentPlayerHealth(state.players[0].health / 100);
    setCurrentEnemyHealth(state.players[1].health / 100);
    setCanvasWidth(canvas.width);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 576;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
    <div className={styles.container}>
      <canvas className={styles.myCanvas} tabIndex={0} autoFocus ref={canvasRef} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
      {load && (
        <div className={styles.overlay}>
          <HealthBar width={canvasWidth / 3} healthRatio={currentPlayerHealth} playerNum={1} />
          <div>adasdasdasd</div>
          <HealthBar width={canvasWidth / 3} healthRatio={currentEnemyHealth} playerNum={2} />
        </div>
      )}

      {/* <button className={styles.btn}>HELLO</button> */}
    </div>
  );
};

export default Game;
