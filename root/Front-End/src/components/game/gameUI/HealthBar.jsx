import styles from "./HealthBar.module.css";

import { CardHeader, Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

const HealthBar = (props) => {
  let healthRatio = props.healthRatio * props.width;

  return (
    <div className={props.className}>
      <div className={styles.healthContainer}>
        <div className={`${styles.healthBar__outer} ${props.playerNum === 1 && styles.healthBar__outer__enemy}`} style={{ width: `${props.width}px` }}>
          <div className={styles.healthBar__inner} style={{ width: `${healthRatio}px` }}></div>
        </div>

        <div className={`${props.playerNum === 2 && styles.flexBox}`}>
          <div className={styles.wrappingProfile}>
            <Avatar className={styles.avatar} sx={{ bgcolor: deepOrange[500] }}>
              N
            </Avatar>
            <p>asdsad</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HealthBar;
