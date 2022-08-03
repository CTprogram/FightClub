import * as React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { getExpressBaseURI } from "../../utils/constants";
import styles from "./Navbar.module.css";
import { useContext } from "react";
import { myContext } from "../../utils/context";
const Navbar = (props) => {
  const ctx = useContext(myContext);
  const user = ctx.userObject;

  const userLogout = async () => {
    console.log("hello");
    const response = await fetch(`${getExpressBaseURI()}/api/user/logout/`, { credentials: "include"}) 
    const responseData = await response.json();
    console.log(responseData + "asasAS");
    ctx.startPending();
    window.location.assign("/");
  };

  return (
    <div className={styles.container}>
      <div>
        <Link to={user && user.username ? "/home" : "/"}>
          {" "}
          <img className={styles.logo} src={logo} />{" "}
        </Link>
      </div>
      {user && user.username && (
        <div className={styles.menu}>
          <h1 className={styles.menu__item}>{user.username}</h1>
          <h1 className={`${styles.menu__item} ${styles.menu__logout}`} onClick={userLogout}>
            Logout
          </h1>
        </div>
      )}
    </div>
  );
};
export default Navbar;
