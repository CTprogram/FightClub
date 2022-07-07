import React, { useEffect, useRef, useContext, useCallback, useState } from "react";
import styles from "./SignUp.Module.css";
import { useForm } from "react-hook-form";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Will be used for Login

  const onSubmitRegister = async (data) => {
    console.log(data);
    var formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("email", data.email);

    // convert formData to JSON since that is what the server looks for
    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });

    const response = await fetch("http://localhost:3001/api/user/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(object),
    });

    const responseData = await response.json();
    console.log(responseData);

    if (response.status === 201) {
      document.getElementById("register-form").reset();
    } else if (response.status === 409) {
      if (responseData.error.includes("username")) {
        //username is taken
      } else {
        //email is taken
      }
    } else if (response.status === 500) {
      console.log("Server error");
    } else {
      //unknown error
    }

    // We want to reload after successful query to display logged in screen
    // window.location.reload();
  };

  return (
    <div className={styles.CardContainer}>
      <Card className={styles.Card}>
        <div className={styles.formTitle}>Signup</div>
        <form id="register-form" className={styles.formContainer} onSubmit={handleSubmit(onSubmitRegister)}>
          <Typography className={styles.formElementTitle}>Username</Typography>
          <input type="text" id="registerUsername" autoComplete="username" {...register("username", { maxLength: 30 })} className={styles.formElement} placeholder="Enter a username" required />
          {errors.name && errors.name.type === "maxLength" && <span>Max length exceeded</span>}
          <Typography className={styles.formElementTitle}> Password</Typography>
          <input type="password" id="registerPassword" autoComplete="new-password" {...register("password")} className={styles.formElement} placeholder="Enter a password" required />

          <Typography className={styles.formElementTitle}> Email</Typography>
          <input type="email" id="email" {...register("email")} autoComplete="email" className={styles.formElement} placeholder="Enter your Email" required />

          <button id="signup" name="action" className={styles.signBtn} variant="contained" size="large">
            Sign up
          </button>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
