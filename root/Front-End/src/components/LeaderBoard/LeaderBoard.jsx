import React, { useEffect, useState, useCallback } from 'react'
import styles from "./LeaderBoard.module.css";
import { motion } from "framer-motion";
import LoaderBoardRow from './LeaderBoardRow/LoaderBoardRow';
import { getExpressBaseURI } from '../../utils/constants';

function LeaderBoard() {
  const [leaderBoardRecords, setleaderBoardRecords] = useState([]);

  useEffect(() => {
    fetch(`${getExpressBaseURI()}/api/leaderboard/records`)
    .then((res) => res.json())
    .then((data) => {
        setleaderBoardRecords(data.result);
    });
  }, [leaderBoardRecords]);
  
  return ( 
    <motion.div 
        className={styles.board}       
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ ease: "easeOut", duration: 2 }}
    >
        <div className={styles.title}>LEADERBOARD</div>
        <div className={styles.rows}>
            <LoaderBoardRow playerInfo={{player: 'Name', games: 'Games', wins: 'Wins', losses: 'Losses', score: 'Score' }} delay={0} isTitle={true}/>
            {leaderBoardRecords.map((record, index) => (
                <LoaderBoardRow key={index} playerInfo={record} delay={(index + 1) / 10} position={index + 1}/>
            ))}
        </div>
    </motion.div>
  )
}

export default LeaderBoard;