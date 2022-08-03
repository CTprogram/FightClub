import React, { useEffect, useRef, useContext, useCallback, useState } from "react";
import { myContext } from "../../utils/context";
import { handleGameState } from "../../utils/gameUtils";
import { SocketContext } from "../../utils/socket";
import styles from "./Game.module.css";
import HealthBar from "./gameUI/HealthBar";
import Waiting from "./gameUI/waiting-animation/Waiting";
import { useToasts } from 'react-toast-notifications';
import { getExpressBaseURI } from "../../utils/constants";
import { motion } from "framer-motion";
import GameEnd from "./gameEnd/GameEnd";

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
  const [gameOver, setgameOver] = useState(null)
  const [currentPlayerRole, setcurrentPlayerRole] = useState(null);
  const [time, setTime] = useState(0);
  const [playerNames, setplayerNames] = useState([]);
  let initialized = false;
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
      handleGameState(state, canvas, ctx, initialized);
      if(!initialized){
        initialized = true;
      } 
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
  }, []);

  const handleJoinedGame = useCallback(() => {
    setcurrentPlayerRole(2);
  }, [currentPlayerRole]);

  const handleUpdateUsers = useCallback((users) => {
    setplayerNames(users);
  }, [playerNames]);

  const handleGameEnd = (winner, state) => {
      setgameOver(winner);
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
        credentials: "include"
      }).then((res) => {
        if (!res.ok) {
          addToast('Could not save results to leaderboard', { appearance: 'error', autoDismiss: true });
        }
      });
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
    socket.on("updatePlayerNames", handleUpdateUsers);

    return () => {
      socket.off("gameSnapShot", handleGameSnapShot);
      socket.off("init", handleInit);
      socket.off("gameInProgress", handleGameInProgress);
      socket.off("gameEnded", handleGameEnd);
      socket.off("updatePlayerNames", handleUpdateUsers);
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
            <HealthBar width={canvasWidth / 3} healthRatio={currentPlayerHealth} displacement={-50} player={{role: 1, name: playerNames[0]}} />
            <motion.h1  
              className={styles.timer}
              initial={{ scale: 1 }}
              animate={{ scale: 0.8, backgroundColor: "red" }}
              transition={{
                duration: 1,
                repeat: 10,
                delay: 80,
              }}
            >{formatTime(time)}</motion.h1>
            <HealthBar width={canvasWidth / 3} healthRatio={currentEnemyHealth}  displacement={50} player={{role: 2, name: playerNames[1]}} />
          </div>
        )}
        {loading && (
          <div className={styles.waiting}>
            <Waiting loading={!load} code={gameCode} />
          </div>
        )}
        {gameOver &&(
          <div className={styles.waiting}>
            <GameEnd decision={gameOver} playerRole={currentPlayerRole}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
