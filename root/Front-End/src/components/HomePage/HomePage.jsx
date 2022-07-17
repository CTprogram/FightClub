import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../utils/user";
import Room from "../game/room/Room";

const HomePage = (props) => {
  const [room, setRoom] = useState();

  const onPlayHandler = () => {
    setRoom(true);
  };
  const cancelPlayHandler = () => {
    console.log("cancel");
    setRoom(false);
  };

  return (
    <div>
      {room && <Room cancelPlayHandler={cancelPlayHandler} />}
      <Button onClick={onPlayHandler}>Play</Button>
    </div>
  );
};
export default HomePage;
