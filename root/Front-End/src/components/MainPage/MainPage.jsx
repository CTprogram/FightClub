import React, { useEffect, useRef, useContext, useCallback, useState } from "react";
import styles from "./MainPage.module.css";
import { Link, Outlet } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import Ninja from "./Ninja.jsx";
import NinjaAnim from "./NinjaAnim";
import { motion } from "framer-motion";
// function Chair(props) {
//   // This reference gives us direct access to the THREE.Mesh object
//   const ref = useRef();
//   // Hold state for hovered and clicked events
//   const [hovered, hover] = useState(false);
//   const [clicked, click] = useState(false);
//   // Subscribe this component to the render-loop, rotate the mesh every frame
//   useFrame((state, delta) => (ref.current.rotation.y += 0.01));
//   // Return the view, these are regular Threejs elements expressed in JSX
//   return (
//     <mesh {...props} ref={ref} scale={clicked ? 1.5 : 1} onClick={(event) => click(!clicked)} onPointerOver={(event) => hover(true)} onPointerOut={(event) => hover(false)}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
//     </mesh>
//   );
// }

const MainPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.welcomeTitle}>Welcome to Fight Club!</div>

        <div className={styles.description}> Where you are able to bash your opponent down and claim glorious victory</div>
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
      <motion.div initial={{ opacity: 0, x: 500 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 2 }} className={styles.canvasContainer}>
        <Canvas>
          <OrbitControls />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {/* <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} /> */}
          <NinjaAnim position={[0, -2, 0]} />
        </Canvas>
      </motion.div>
      <Outlet />
    </div>
  );
};

export default MainPage;
