import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
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
const menuItems = ["Home", "Leaderboard"];
const profileItems = ["Profile", "Account", "Logout"];

function App() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState(false);
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
    var formdata = new FormData();
    formdata.append("username", data.username);
    formdata.append("password", data.password);

    // convert formData to JSON since that is what the server looks for
    var object = {};
    formdata.forEach(function (value, key) {
      object[key] = value;
    });
    console.log(object);

    // const response = await fetch('http://localhost:3000/api/user/register/', {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(object),
    // });

    // console.log(response.data);
    axios.post("/api/user/register/",object).then((resp) => {
      console.log(resp.data);
    });


    document.getElementById("register-form").reset();
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
    <div className="App">
      <AppBar className="Menu">
        <Toolbar disableGutters className="Menu">
          <div className="LogoContainer">
            <SportsMmaIcon />
            <Typography variant="h6">Fight Club</Typography>
          </div>

          {user && (
            <Box className="MenuItems">
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

          {user && (
            <Box className="UserMenuContainer">
              <Tooltip title="Open settings">
                <IconButton onClick={openUserMenu}>
                  <Avatar alt="" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                className="UserMenu"
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
              <Typography variant="h6" className="Username">
                John
              </Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <div className="CardContainer">
        <Card className="Card">
          <Typography className="form-title">Login</Typography>
          <form
            id="login-form"
            className="LoginFormContainer"
            onSubmit={handleSubmit2(onSubmitLogin)}
          >
            <Typography className="form-element-title">Username</Typography>
            <input
              type="text"
              autoComplete="username"
              name="username"
              {...register2("username", { maxLength: 30 })}
              className="form-element"
              placeholder="Enter a username"
              required
            />
            <Typography className="form-element-title"> Password</Typography>
            <input
              type="password"
              autoComplete="current-password"
              name="password"
              {...register2("password")}
              className="form-element"
              placeholder="Enter a password"
              required
            />

            <button
              id="signin"
              name="action"
              className="signBtn"
              variant="contained"
              size="large"
            >
              Sign in
            </button>
          </form>
        </Card>

        <Card className="Card">
          <Typography className="form-title">Signup</Typography>
          <form
            id="register-form"
            className="LoginFormContainer"
            onSubmit={handleSubmit(onSubmitRegister)}
          >
            <Typography className="form-element-title">Username</Typography>
            <input
              type="text"
              id="registerUsername"
              autoComplete="username"
              {...register("username", { maxLength: 30 })}
              className="form-element"
              placeholder="Enter a username"
              required
            />
            {errors.name && errors.name.type === "maxLength" && (
              <span>Max length exceeded</span>
            )}
            <Typography className="form-element-title"> Password</Typography>
            <input
              type="password"
              id="registerPassword"
              autoComplete="new-password"
              {...register("password")}
              className="form-element"
              placeholder="Enter a password"
              required
            />

            <Typography className="form-element-title"> Email</Typography>
            <input
              type="email"
              id="email"
              {...register("email")}
              autoComplete="email"
              className="form-element"
              placeholder="Enter your Email"
              required
            />

            <button
              id="signup"
              name="action"
              className="signBtn"
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
