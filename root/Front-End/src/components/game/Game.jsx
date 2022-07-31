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
import { useToasts } from 'react-toast-notifications';
import { getExpressBaseURI } from "../../utils/constants";

const Game = () => {
  const canvasRef = useRef(null);
  const socket = useContext(SocketContext);
  const { addToast } = useToasts();
  const [currentPlayerHealth, setCurrentPlayerHealth] = useState(1);
  const [currentEnemyHealth, setCurrentEnemyHealth] = useState(1);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gameCode, setGameCode] = useState("");
  const [playerOne, setPlayerOne] = useState(null);
  const [playerTwo, setPlayerTwo] = useState(null);
  const [gameOver, setgameOver] = useState(false)
  const [currentPlayerRole, setcurrentPlayerRole] = useState(null);
  const [time, setTime] = useState(0);
  const ctx = React.useContext(myContext);
  const user = ctx.userObject;

  console.log('CURRENT PLAYER: ',user);
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
    setcurrentPlayerRole(1);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
  }, []);

  const handleGameInProgress = useCallback((roomId) => {
    //setcurrentPlayerRole(2);
  }, []);

  const handleJoinedGame = useCallback(() => {
    setcurrentPlayerRole(2);
  }, [currentPlayerRole]);

  const handleGameEnd = (winner, state) => {
      const body = {
        player : user.username,
        playerHealth : state.players[currentPlayerRole - 1].health,
        isWin : winner === currentPlayerRole,
        decision : winner
      };
      fetch(`${getExpressBaseURI()}/api/leaderboard/records`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (!res.ok) {
          // if (res.status === 400) {
          //   throw new Error("Cannot signup without username or password.");
          // } else if (res.status === 409) {
          //   throw new Error("Username is already taken.");
          // } else {
          //   throw new Error(res.statusText);
          // }
          console.log('not ok');
        }
      });
      console.log(body);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 576;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    socket.on("gameSnapShot", handleGameSnapShot);
    socket.on("init", handleInit);
    socket.on("gameInProgress", handleGameInProgress);
    socket.on("gameEnded", handleGameEnd);
    socket.on("joinedGame", handleJoinedGame);

    return () => {
      socket.off("gameSnapShot", handleGameSnapShot);
      socket.off("init", handleInit);
      socket.off("gameInProgress", handleGameInProgress);
      socket.off("gameEnded", handleGameEnd);
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
      <p>Current role: {currentPlayerRole}</p>
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
