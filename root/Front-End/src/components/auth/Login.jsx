import React, { useEffect, useRef, useContext, useCallback, useState } from "react";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Card from "../UI/Card";
import { Link, Outlet } from "react-router-dom";


const Login = () => {

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
      } = useForm();
    
      const onSubmitLogin = async (data) => {
        var formData = new FormData();
        formData.append("username", data.username);
        formData.append("password", data.password);
    
        // convert formData to JSON since that is what the server looks for
        var object = {};
        formData.forEach(function (value, key) {
          object[key] = value;
        });
    
        const response = await fetch('http://localhost:3001/api/user/login/', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          mode: 'cors',
          body: JSON.stringify(object),
        });
        const responseData = await response.json();
        console.log(responseData);
        
          if (response.status === 200) {
            //on successful login do something
          document.getElementById("login-form").reset();
        }
        else if (response.status === 401) {
          //invalid password or email
        }
        else if (response.status === 400) {
          
        }
    
      };
    
    return (
      <div className={styles.container}>
        <Card className={styles.card}>
        <div className={styles.formTitle}>Login</div>
          <form
            id="login-form"
            className={styles.formContainer}
            onSubmit={handleSubmit2(onSubmitLogin)}
          >
            <Typography className={styles.formElementTitle}>Username</Typography>
            <input
              type="text"
              autoComplete="username"
              name="username"
              {...register2("username", { maxLength: 30 })}
              className={styles.formInput}
              placeholder="Enter a username"
              required
            />
            <Typography className={styles.formElementTitle}> Password</Typography>
            <input
              type="password"
              autoComplete="current-password"
              name="password"
              {...register2("password")}
            className={styles.formInput}
              placeholder="Enter a password"
              required
            />
          
            <button
              id="signin"
              name="signin"
              className={styles.signBtn}
            >
              Sign in
            </button>
          
          <div className={styles.optionalText}>Or login with</div>

          <div className={styles.btnContainer}>
           <button id="authSignin"
              name="auth" className={styles.authBtn}>
                Google
            </button>
            <button id="authSignin"
              name="auth" className={styles.authBtn}>
                Facebook
            </button>

          </div>

            <div className={styles.optionalText}>Don't have an account yet?</div>
            <Link to="/signup">
              <button
                className={styles.signUpBtn}
              >
              Signup
              </button>
            </Link>

          </form>
        </Card>
          
    </div>
    );
  };
  
  export default Login;