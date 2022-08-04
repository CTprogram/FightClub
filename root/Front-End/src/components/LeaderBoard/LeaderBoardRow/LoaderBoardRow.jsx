import React from "react";
import styles from "./LeaderBoardRow.module.css";
import { motion } from "framer-motion";

function LoaderBoardRow(props) {
  return (
    <motion.div
      className={styles.row}
      initial={{ x: 500 }}
      animate={{ x: 0 }}
      transition={{ duration: props.delay }}
      whileHover={{ scale: 1.1, originX: 0, transition: { duration: 0.2 } }}
    >
      <div className={`${styles.text} ${styles.player}`}>
        {!props.isTitle && props.position + "."} {props.playerInfo.player}
      </div>
      <div className={`${styles.text} ${styles.middle}`}>
        {props.playerInfo.games}
      </div>
      <div className={`${styles.text} ${styles.middle}`}>
        {props.playerInfo.wins}
      </div>
      <div className={`${styles.text} ${styles.middle}`}>
        {props.playerInfo.losses}
      </div>
      <div className={`${styles.text} ${styles.score}`}>
        {props.playerInfo.score}
      </div>
    </motion.div>
  );
}

export default LoaderBoardRow;
