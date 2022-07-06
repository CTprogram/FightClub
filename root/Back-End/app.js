const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes = require("./Routes/UserRoutes");

//Middleware
app.use("/api/user/", userRoutes);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect to DB
mongoose.connect("mongodb://localhost:27017/", () =>
  console.log("Connected to db!")
);

const http = require("http");
app.listen(port, function (err) {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", port);
});
