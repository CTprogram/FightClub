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
import { Link, Outlet } from "react-router-dom";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitResetPassword = async (data) => {
    var formData = new FormData();
    formData.append("email", data.email);

    // convert formData to JSON since that is what the server looks for
    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });

    const response = await fetch(
      "http://localhost:3001/api/user/forgotPassword",
      {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify(object),
      }
    );
    const responseData = await response.json();
    console.log(responseData);

    if (response.status === 200) {
      //on successful login do something
      console.log("successfully sent email to reset");
      document.getElementById("resetPassword-form").reset();
    } else if (response.status === 401) {
      //invalid password or email
    } else if (response.status === 400) {
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
