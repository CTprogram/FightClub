import React from "react";
import styles from "./ResetPassword.module.css";
import { useForm } from "react-hook-form";
import Card from "../UI/Card";
import { Link, useNavigate } from "react-router-dom";
import { getExpressBaseURI } from "../../utils/constants";
import { useToasts } from "react-toast-notifications";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const onSuccess = (responseNum) => {
    if (responseNum === 1) {
      navigate("/login");
    } else if (responseNum === 2) {
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
    // Convert formData to JSON since that is what the server looks for
    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });

    const response = await fetch(
      `${getExpressBaseURI()}/api/user/resetPassword/`,
      {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(object),
      }
    );
    const responseData = await response.json();
    if (response.status === 200) {
      onSuccess(1);
      addToast("Reset password Successfully Completed", {
        appearance: "success",
        autoDismiss: true,
      });
      document.getElementById("resetPassword-form").reset();
    } else if (response.status === 401) {
      if (responseData.error.includes("email")) {
        addToast("Invalid Email", { appearance: "error", autoDismiss: true });
      } else {
        addToast("Invalid Reset Code", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } else if (response.status === 410) {
      onSuccess(2);
      addToast("Expired Reset Code", {
        appearance: "error",
        autoDismiss: true,
      });
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
            type="password"
            autoComplete="newPassword"
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
