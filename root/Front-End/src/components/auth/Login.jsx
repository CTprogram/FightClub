import React, { useEffect, useRef, useContext, useCallback, useState } from "react";
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";

import Card from "../UI/Card";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { myContext } from "../../utils/context";
import { getExpressBaseURI } from "../../utils/constants";
import { useToasts } from 'react-toast-notifications';

const Login = () => {
  const navigate = useNavigate();
  const ctx = useContext(myContext);
  const { addToast } = useToasts();

  const onSuccess = () => {
    ctx.startPending();
    navigate("/home");
  };

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

    const response = await fetch(`${getExpressBaseURI()}/api/user/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(object),
    });
    const responseData = await response.json();
    console.log(responseData);

    if (response.status === 200) {
      //on successful login do something
      onSuccess();
      addToast('Logged in Successfully', { appearance: 'success', autoDismiss: true });
      document.getElementById("login-form").reset();
    } else if (response.status === 401) {
      addToast('Invalid password or email', { appearance: 'error', autoDismiss: true });
    } else if (response.status === 400) {
      addToast('Email or password missing.', { appearance: 'error', autoDismiss: true });
    }
  };

  const googleLogin = () => {
    window.open(`${getExpressBaseURI()}/auth/google`, "_self");
    ctx.startPending();
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.formTitle}>Log In</div>
        <form id="login-form" className={styles.formContainer} onSubmit={handleSubmit2(onSubmitLogin)}>
          <div className={styles.formElementTitle}>Username </div>
          <input type="text" autoComplete="username" name="username" {...register2("username", { maxLength: 30 })} className={styles.formInput} placeholder="Enter a username" required />
          <div className={styles.formElementTitle}>Password </div>
          <input type="password" autoComplete="current-password" name="password" {...register2("password")} className={styles.formInput} placeholder="Enter a password" required />

          <button id="signin" name="signin" className={styles.signBtn}>
            Log In
          </button>

          <div className={styles.optionalText}>Or login with</div>

          <div className={styles.btnContainer}>
            <button onClick={googleLogin} id="authSignin" name="auth" className={styles.authBtn}>
              Google
            </button>
            <button id="authSignin" name="auth" className={styles.authBtn}>
              Facebook
            </button>
          </div>
          <Link to="/forgotPassword" className={styles.forgetPasswordlink}>
            Forgot Password?
          </Link>

          <div className={styles.optionalText}>Don't have an account yet?</div>
          <Link to="/signup" className={styles.link}>
            <button className={styles.signUpBtn}>Sign Up</button>
          </Link>
        </form>
      </Card>
    </div>
  );
};

export default Login;
