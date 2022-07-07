const express = require("express");
const cookie = require("cookie");
const app = express();
const port = 3001;
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./Routes/UserRoutes");

//Middleware to parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//Enables session
const session = require("express-session");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

//connect to mongoDB
mongoose.connect("mongodb://localhost:27017/", () =>
  console.log("Connected to db!")
);

//Middleware
app.use("/api/user/", userRoutes);

const http = require("http");
app.listen(port, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", port);
});
