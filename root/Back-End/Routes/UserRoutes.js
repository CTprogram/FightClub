const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const user = require("../db/Models/UserSchema");

router.post("/register/", function (req, res, next) {
  const requiredSchema = ["username", "password", "email"];
  let missingFields = [];

  for (let j = 0; j < requiredSchema.length; j++) {
    let requiredSchemaItem = requiredSchema[j];

    if (!(requiredSchemaItem in req.body)) {
      missingFields.push(requiredSchemaItem);
    }
  }

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: "Invalid mandatory fields",
      mandatory: missingFields,
    });
  }
  var password = req.body.password;
  user.find(
    { $or: [{ email: req.body.email }, { username: req.body.username }] },
    function (err, userDoc) {
      if (err) return res.status(500).json({ error: err });

      //Determine if email or username already exists
      if (userDoc.length > 0) {
        if (userDoc[0].username === req.body.username) {
          return res.status(409).json({
            error: "username " + req.body.username + " already exists",
          });
        } else if (userDoc[0].email === req.body.email) {
          return res
            .status(409)
            .json({ error: "email " + req.body.email + " already exists" });
        }
      }

      bcrypt.genSalt(10, function (err, salt) {
        if (err) return res.status(500).json({ error: err });

        bcrypt.hash(password, salt, function (err, hash) {
          if (err) return res.status(500).json({ error: err });

          const regUserItem = new user({
            username: req.body.username,
            password: hash,
            email: req.body.email,
          });

          regUserItem
            .save()
            .then((data) => {
              return res
                .status(201)
                .json({ username: req.body.username, email: req.body.email });
            })
            .catch((err) => {
              return res.status(500).json({ error: err });
            });
        });
      });
    }
  );
});

router.post("/login/", function (req, res, next) {
  var invalidFields = [];

  res.status(200).json({ message: "working", status: 200 });
});

module.exports = router;
