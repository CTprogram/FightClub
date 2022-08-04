import React from "react";
import styles from "./MainPage.module.css";
import { Link, Outlet } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import NinjaAnim from "./NinjaAnim";
import { motion } from "framer-motion";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.welcomeTitle}>Welcome to Fight Club!</div>

        <div className={styles.description}>
          {" "}
          Where you are able to bash your opponent down and claim glorious
          victory
        </div>
        <div className={styles.btnContainer}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className={styles.btnItem}
          >
            <Link to="/login">
              <button className={styles.signBtn}>Login</button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.75,
              delay: 0.35,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Link to="/signup">
              <button className={styles.signBtn}>Signup</button>
            </Link>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 500 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2 }}
        className={styles.canvasContainer}
      >
        <Canvas>
          <OrbitControls />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <NinjaAnim position={[0, -2, 0]} />
        </Canvas>
      </motion.div>
      <Outlet />
    </div>
  );
};

export default MainPage;
