import { useState } from "react";
import logo from "./logo.svg";
import { useForm } from "react-hook-form";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import PersonIcon from "@mui/icons-material/Person";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import { formHelperTextClasses } from "@mui/material";
const menuItems = ["Home", "Leaderboard"];
const profileItems = ["Profile", "Account", "Logout"];
import styles from "./App.module.css";


function App() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState({});
  // Will be used for signUp
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Will be used for Login
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm();

  const onSubmitLogin = (data) => {
    console.log(data);
  };

  const onSubmitRegister = async (data) => {
    var formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("email", data.email);

    // convert formData to JSON since that is what the server looks for
    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });

    const response = await fetch('http://localhost:3000/api/user/register/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object),
    });

    const responseData = await response.json();
    console.log(responseData);

    if (response.status < 200 || response.status > 300) {
      throw responseData;
    }

    setUser(responseData);
    document.getElementById("register-form").reset();

    // We want to reload after successful query to display logged in screen
    // window.location.reload();
  };
  // const [loginInfo, handleSignin] = useForm();

  const openUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const closeUserMenu = () => {
    setAnchorElUser(null);
  };

  // const onSignIn = () => {
  //   console.log(loginInfo);
  // };
  
  return (
    <div className={styles.App}>
      <AppBar className={styles.Menu}>
        <Toolbar disableGutters className={styles.Menu}>
          <div className={styles.LogoContainer}>
            <SportsMmaIcon />
            <Typography variant="h6">Fight Club</Typography>
          </div>

          {user && user.username &&(
            <Box className={styles.menuItems}>
              {menuItems.map((item) => (
                <Button
                  key={item}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          )}

          {user && user.username && (
            <Box className={styles.UserMenuContainer}>
              <Tooltip title="Open settings">
                <IconButton onClick={openUserMenu}>
                  <Avatar alt="" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                className={styles.userMenu}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={closeUserMenu}
              >
                {profileItems.map((item) => (
                  <MenuItem key={item} onClick={closeUserMenu}>
                    <Typography textAlign="center">{item}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <Typography variant="h6" className={styles.Username}>
                {user.username}
              </Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <div className={styles.CardContainer}>
        <Card className={styles.Card}>
          <Typography className={styles.formTitle}>Login</Typography>
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
              className={styles.formElement}
              placeholder="Enter a username"
              required
            />
            <Typography className={styles.formElementTitle}> Password</Typography>
            <input
              type="password"
              autoComplete="current-password"
              name="password"
              {...register2("password")}
              className={styles.formElement}
              placeholder="Enter a password"
              required
            />

            <button
              id="signin"
              name="action"
              className={styles.signBtn}
              variant="contained"
              size="large"
            >
              Sign in
            </button>
          </form>
        </Card>

        <Card className={styles.Card}>
          <Typography className={styles.formTitle}>Signup</Typography>
          <form
            id="register-form"
            className={styles.formContainer}
            onSubmit={handleSubmit(onSubmitRegister)}
          >
            <Typography className={styles.formElementTitle}>Username</Typography>
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
            <Typography className={styles.formElementTitle}> Password</Typography>
            <input
              type="password"
              id="registerPassword"
              autoComplete="new-password"
              {...register("password")}
              className={styles.formElement}
              placeholder="Enter a password"
              required
            />

            <Typography className={styles.formElementTitle}> Email</Typography>
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
              id="signup"
              name="action"
              className={styles.signBtn}
              variant="contained"
              size="large"
            >
              Sign up
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default App;
