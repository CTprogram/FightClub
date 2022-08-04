import React from "react";
import styles from "./GameEnd.module.css";
import { motion } from "framer-motion";

function GameEnd({ decision, playerRole }) {
  const text =
    decision === 3
      ? "The game was a tie."
      : decision === playerRole
      ? "You won the game !"
      : "You lost the game";

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ rotate: 360, scale: 1 }}
      transition={{ duration: 1 }}
      className={styles.wrapper}
    >
      <div className={styles.text}>{text}</div>
    </motion.div>
  );
}

export default GameEnd;
