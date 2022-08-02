import styles from "./HealthBar.module.css";
import { myContext } from "../../../utils/context";
import { CardHeader, Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import kenjiAvatar from '../../../assets/kenji-avatar.png';
import kingAvatar from '../../../assets/king-avatar.png';
import React, { useContext } from "react";
import { motion } from "framer-motion";

const HealthBar = (props) => {
  let healthRatio = props.healthRatio * props.width;
  const imageSrc = props.player.role == 1 ? kenjiAvatar : kingAvatar;
  const ctx = React.useContext(myContext);
  const user = ctx.userObject;

  return (
    <motion.div initial={{x: props.displacement}} animate={{x: 0}} transition={{ ease: "easeOut", duration: 1}} className={props.className}>
      <div className={styles.healthContainer}>
        <div className={`${styles.healthBar__outer} ${props.player.role === 1 && styles.healthBar__outer__enemy}`} style={{ width: `${props.width}px` }}>
          <div className={styles.healthBar__inner} style={{ width: `${healthRatio}px` }}></div>
        </div>

        <div className={`${props.player.role === 2 && styles.flexBox}`}>
          <div className={`${styles.wrappingProfile} ${props.player.role === 2 && styles.flexReverse}`}>
            <Avatar className={styles.avatar} sx={{ bgcolor: deepOrange[500] }} src={imageSrc}/>
            <p className={styles.usernames}>{props.player.name}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default HealthBar;
