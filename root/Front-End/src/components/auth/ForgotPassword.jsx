import React from "react";
import styles from "./ForgotPassword.module.css";
import { useForm } from "react-hook-form";
import Card from "../UI/Card";
import { Link, useNavigate } from "react-router-dom";
import { getExpressBaseURI } from "../../utils/constants";
import { useToasts } from "react-toast-notifications";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSuccess = () => {
    navigate("/resetPassword");
  };

  const onSubmitForgotPassword = async (data) => {
    var formData = new FormData();
    formData.append("email", data.email);

    // convert formData to JSON since that is what the server looks for
    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });

    const response = await fetch(
      `${getExpressBaseURI()}/api/user/forgotPassword/`,
      {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(object),
      }
    );

    const responseData = await response.json();
    if (response.status === 200) {
      //on successful login do something
      onSuccess();
      addToast("Successfully sent Reset Password Code", {
        appearance: "success",
        autoDismiss: true,
      });
      document.getElementById("resetPassword-form").reset();
    } else if (response.status === 401) {
      //invalid password or email
      addToast("Invalid Email", { appearance: "error", autoDismiss: true });
    } else if (response.status === 400) {
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.formTitle}>Forgot Password</div>
        <form
          id="resetPassword-form"
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmitForgotPassword)}
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

          <button
            id="resetPassword"
            name="resetPassword"
            className={styles.signBtn}
          >
            Send reset password
          </button>

          <Link to="/" className={styles.link}>
            <button className={styles.signBtn}>Cancel</button>
          </Link>

          <Link to="/resetPassword" className={styles.link}>
            Already have a Reset Code?
          </Link>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
