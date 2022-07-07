import styles from "./Room.module.css";
import { Button, Stack, TextField } from "@mui/material";
import Card from "../../UI/Card";
import { SocketContext } from "../../../utils/socket";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
const Room = (props) => {
  const socket = useContext(SocketContext);
  const [code, setCode] = useState("asdasds");
  const createGame = () => {
    socket.emit("createGame");
  };

  const joinRoom = () => {
    socket.emit("joinRoom", code);
  };
  const joinRandom = () => {
    socket.emit("joinRandom");
  };
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
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

export default Room;
