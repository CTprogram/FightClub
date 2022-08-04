import React from "react";
import styles from "./SignUp.module.css";
import { useForm } from "react-hook-form";
import Card from "../UI/Card";
import { getExpressBaseURI } from "../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const SignUp = () => {
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const onSuccess = () => {
    navigate("/login");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitRegister = async (data) => {
    var formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("email", data.email);

    // Convert formData to JSON since that is what the server looks for
    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });

    const response = await fetch(`${getExpressBaseURI()}/api/user/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(object),
    });

    const responseData = await response.json();

    if (response.status === 201) {
      onSuccess();
      addToast("SignUp in Successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      document.getElementById("register-form").reset();
    } else if (response.status === 409) {
      if (responseData.error.includes("username")) {
        //username is taken
        addToast("Username is already taken", {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        addToast("Email is already in use", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    } else if (response.status === 500) {
      addToast("Server Error occured while trying to sign up", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      addToast("Could not sign up", { appearance: "error", autoDismiss: true });
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.formTitle}>Sign Up</div>
        <form
          id="register-form"
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmitRegister)}
        >
          <div className={styles.formElementTitle}>Username</div>
          <input
            type="text"
            id="registerUsername"
            autoComplete="username"
            {...register("username", { maxLength: 30 })}
            className={styles.formElement}
            placeholder="Enter a username"
            required
          />
          {errors.name && errors.name.type === "maxLength" && (
            <span>Max length exceeded</span>
          )}
          <div className={styles.formElementTitle}>Password</div>
          <input
            type="password"
            id="registerPassword"
            autoComplete="new-password"
            {...register("password")}
            className={styles.formElement}
            placeholder="Enter a password"
            required
          />

          <div className={styles.formElementTitle}>Email</div>
          <input
            type="email"
            id="email"
            {...register("email")}
            autoComplete="email"
            className={styles.formElement}
            placeholder="Enter your Email"
            required
          />

          <button
            type="submit"
            id="signup"
            name="action"
            className={styles.signBtn}
          >
            Sign Up
          </button>

          <div className={styles.optionalText}>Have an account already?</div>
          <Link to="/login" className={styles.link}>
            <button className={styles.signinBtn}>Log In</button>
          </Link>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
