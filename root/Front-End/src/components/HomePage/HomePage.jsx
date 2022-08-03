import { useContext, useState } from "react";
import { myContext } from "../../utils/context";
import Room from "../game/room/Room";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import styles from "./Homepage.module.css";
import { motion } from 'framer-motion';

const HomePage = (props) => {
  const user = useContext(myContext);
  console.log(user);
  const [room, setRoom] = useState();

  const onPlayHandler = () => {
    setRoom(true);
  };
  const cancelPlayHandler = () => {
    console.log("cancel");
    setRoom(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.gamePlay}>
        {room && <Room cancelPlayHandler={cancelPlayHandler} />}
        <div className={styles.gamePlayText}>Ready to play for glory?</div>
        <motion.div 
          className={styles.gamePlayButton} 
          onClick={onPlayHandler}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          whileHover={{ scale: 1.2, originX: 0, transition: { type: 'springy', stiffness: 300}}}
        >
          Play
        </motion.div>
      </div>
      <div className={styles.leaderBoardSpace}>
        <LeaderBoard/>
      </div>
    </div>
  );
};
export default HomePage;
