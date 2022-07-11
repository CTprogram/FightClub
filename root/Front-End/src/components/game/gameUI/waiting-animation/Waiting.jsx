import React, { useEffect, useState } from 'react'
import styles from "./Waiting.module.css";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

function Waiting({loading}) {

    const [text, setText] = useState('Waiting for opponent to join...');

    useEffect(() => {
       if(!loading) setText('Let the games begin!');
    }, [loading])
    
  return (
    <div className={`${styles.wrapper} ${!loading && styles.fadeout}`}>
        <div className={styles.text}>
            {text}
        </div>
        {loading ? (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        ) : (<CheckCircleRoundedIcon className={styles.icon} />)}
    </div>
  )
}

export default Waiting