import React, { useEffect, useRef, useContext, useCallback, useState } from "react";
import { Navigate } from "react-router-dom";
import { io } from "socket.io-client";
import { myContext } from "../../utils/context";
import { handleGameState } from "../../utils/gameUtils";
import { Sprite, Fighter } from "../../utils/gameUtils";
import { SocketContext } from "../../utils/socket";
import styles from "./Game.module.css";
import HealthBar from "./gameUI/HealthBar";
import Waiting from "./gameUI/waiting-animation/Waiting";
import image from "../../assets/kenji/Idle.png";
const Game = () => {

  const user = useContext(myContext);

  if(!(user && user.username)) {
    return <Navigate to="/"/>
  }

  const canvasRef = useRef(null);
  const socket = useContext(SocketContext);
  const [currentPlayerHealth, setCurrentPlayerHealth] = useState(1);
  const [currentEnemyHealth, setCurrentEnemyHealth] = useState(1);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gameCode, setGameCode] = useState("");
  const [playerOne, setPlayerOne] = useState(null);
  const [playerTwo, setPlayerTwo] = useState(null);
  const [time, setTime] = useState(0);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };
  const handleGameSnapShot = useCallback(
    (state) => {
      if (!load) setLoad(true);
      if (loading)
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      state = JSON.parse(state);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      handleGameState(state, canvas, ctx);
      setCurrentPlayerHealth(state.players[0].health / 100);
      setCurrentEnemyHealth(state.players[1].health / 100);
      setTime(state.timeLeft);
      setCanvasWidth(canvas.width);
    },
    [playerOne, playerTwo]
  );

  const handleInit = useCallback((gameCode) => {
    setGameCode(gameCode);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
  }, []);

  const handleGameInProgress = useCallback((roomId) => {
    // setLoad(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 576;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    socket.on("gameSnapShot", handleGameSnapShot);
    socket.on("init", handleInit);
    socket.on("gameInProgress", handleGameInProgress);

    return () => {
      socket.off("gameSnapShot", handleGameSnapShot);
      socket.off("init", handleInit);
      socket.off("gameInProgress", handleGameInProgress);
    };
  }, [socket, gameCode, load]);

  const handleKeyDown = (e) => {
    console.log("a");
    socket.emit("keyDown", e.key);
  };
  const handleKeyUp = (e) => {
    console.log("b");
    socket.emit("keyUp", e.key);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.gameScreen} style={canvasRef.current && { width: canvasRef.current.width }}>
        <canvas className={styles.myCanvas} tabIndex={0} autoFocus ref={canvasRef} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
        {load && (
          <div className={styles.overlay}>
            <HealthBar width={canvasWidth / 3} healthRatio={currentPlayerHealth} playerNum={1} />
            <h1 className={styles.timer}>{formatTime(time)}</h1>
            <HealthBar width={canvasWidth / 3} healthRatio={currentEnemyHealth} playerNum={2} />
          </div>
        )}
        {loading && (
          <div className={styles.waiting}>
            <Waiting loading={!load} code={gameCode} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
