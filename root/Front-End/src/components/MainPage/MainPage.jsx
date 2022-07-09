import React, { useEffect, useRef, useContext, useCallback, useState } from "react";
import styles from "./MainPage.module.css";
import { Link, Outlet } from "react-router-dom";


const MainPage = () => {
  
   
  return (
    <div className={styles.container}>
          <div className={styles.welcomeTitle}>Welcome to Fight Club!</div>
          
          <div className={styles.description}> Where you are able to bash your opponent down and claim glorious victory</div>
          <div className={styles.btnContainer}>
              <div className={styles.btnItem}>
              <Link to="/login"><button className={styles.signBtn}>Login</button></Link>
              </div>
              <div>
              <Link to="/signup"><button className={styles.signBtn}>Signup</button></Link>
                </div>
          </div>
          <Outlet />
    </div>
  );
};

export default MainPage;
