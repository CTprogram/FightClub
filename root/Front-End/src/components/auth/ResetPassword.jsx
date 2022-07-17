import React, {
  useEffect,
  useRef,
  useContext,
  useCallback,
  useState,
} from "react";
import styles from "./ResetPassword.module.css";
import { useForm } from "react-hook-form";
import Card from "../UI/Card";
import { Link, Outlet, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const onSuccess = (responseNum) => {
    if (responseNum === 1) {
      navigate("/login");
    }
    else if (responseNum === 2) {
      navigate("/forgotPassword");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitResetPassword = async (data) => {
    var formData = new FormData();
    formData.append("email", data.email);
    formData.append("resetCode", data.resetCode);
    formData.append("password", data.password);
    // convert formData to JSON since that is what the server looks for
    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });

    const response = await fetch(
      "http://localhost:3001/api/user/resetPassword/",
      {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(object),
      }
    );

    if (response.status === 200) {
      //on successful login do something
      onSuccess(1);
      console.log("successfully sent email to reset");
      document.getElementById("resetPassword-form").reset();
    } else if (response.status === 401) {
      //invalid password or email
    } else if (response.status === 410) {
      onSuccess(2);
      console.log("Reset code expired");
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.formTitle}>Reset Password</div>
        <form
          id="resetPassword-form"
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmitResetPassword)}
        >
          <div className={styles.formElementTitle}>Enter your email</div>
          <input
            type="email"
            autoComplete="Email"
            {...register("email")}
            className={styles.formInput}
            placeholder="Email"
            required
          />

          <div className={styles.formElementTitle}>Enter your new password</div>
          <input
            type="text"
            autoComplete="text"
            {...register("password")}
            className={styles.formInput}
            placeholder="password"
            required
          />

          <div className={styles.formElementTitle}>Enter reset Code</div>
          <input
            type="text"
            autoComplete="resetCode"
            {...register("resetCode")}
            className={styles.formInput}
            placeholder="Code"
            required
          />

          <button
            id="resetPassword"
            name="resetPassword"
            className={styles.signBtn}
          >
            Submit new password
          </button>

          <Link to="/" className={styles.link}>
            <button className={styles.signBtn}>Cancel</button>
          </Link>
        </form>
      </Card>
    </div>
  );
};

export default ResetPassword;
