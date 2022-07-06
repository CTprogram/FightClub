const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const user = require("../db/Models/UserSchema");

router.post("/register/", function (req, res, next) {
  console.log(req.body);
  res.status(200).json({ message: "working", status: 200 });
});

router.get("/", function (req, res, next) {
  res.send("We are user routes");
});

module.exports = router;
