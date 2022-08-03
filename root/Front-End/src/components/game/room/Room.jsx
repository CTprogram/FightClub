import styles from "./Room.module.css";
import { Button, Stack, TextField } from "@mui/material";
import Card from "../../UI/Card";
import { SocketContext } from "../../../utils/socket";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import React from "react";
import ReactDOM from "react-dom";
import { myContext } from "../../../utils/context";
import { useToasts } from 'react-toast-notifications';

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.cancelPlayHandler} />;
};

const RoomOverlay = (props) => {
  let navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [code, setCode] = useState("asdasds");
  const ctx = React.useContext(myContext);
  const user = ctx.userObject;
  const { addToast } = useToasts();

  const createGame = () => {
    socket.emit("createdRoom", user.username);
    navigate("/game");
  };

  const joinRoom = () => {
    socket.emit("joinRoom", code, user.username);
    navigate("/game");
  };

  const joinRandom = () => {
    socket.emit("joinPublicRoom", user.username);
    navigate("/game");
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleGameInProgress = () => {
    addToast('Room has game in progress', { appearance: 'error', autoDismiss: true });
    navigate("/home");
  }

  const handleInvalidRoom = () => {
    addToast('Invalid room code', { appearance: 'error', autoDismiss: true });
    navigate("/home");
  }

  useEffect(() => {
    socket.once("gameInProgress", handleGameInProgress);
    socket.once("invalidRoom", handleInvalidRoom);
  }, []);

  return (
    <Card className={styles.modal}>
      <Card className={styles.container}>
        <header>
          <h2>Create Game</h2>
        </header>
        <div className={styles.start}>
          <Button onClick={createGame} variant="contained">
            Create
          </Button>
        </div>
      </Card>
      <Card className={styles.container}>
        <header>
          <h2>Join Room</h2>
        </header>
        <div className={styles.joinGame}>
          <TextField onChange={handleCodeChange} value={code} id="outlined-basic" label="Room ID" variant="outlined" />
          <Button onClick={joinRoom} variant="contained">
            Join
          </Button>
        </div>
      </Card>
      <Card className={styles.container}>
        <header>
          <h2>Join Random Match</h2>
        </header>
        <div>
          <Button onClick={joinRandom} variant="contained">
            Join
          </Button>
        </div>
      </Card>
    </Card>
  );
};

const Room = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop cancelPlayHandler={props.cancelPlayHandler} />, document.getElementById("backdrop-root"))}
      {ReactDOM.createPortal(<RoomOverlay />, document.getElementById("overlay-root"))}
    </React.Fragment>
  );
};

export default Room;
