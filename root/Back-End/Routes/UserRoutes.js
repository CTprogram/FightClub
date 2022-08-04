const bcrypt = require("bcrypt");
const express = require("express");
const cookie = require("cookie");
const router = express.Router();
const user = require("../db/Models/UserSchema");
const sendEmail = require("../Email/EmailMailer");
const ResetPassword = require("../db/Models/ResetPasswordSchema");
const crypto = require("crypto");
const sanitize = require("mongo-sanitize");
const authMiddleware = require("../Middleware/auth");

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

  var username = sanitize(req.body.username);
  var password = sanitize(req.body.password);
  var email = sanitize(req.body.email);

  user.find(
    { $or: [{ email: email }, { username: username }] },
    function (err, userDoc) {
      if (err) return res.status(500).json({ error: err });

      //Determine if email or username already exists
      if (userDoc.length > 0) {
        if (userDoc[0].username === username) {
          return res.status(409).json({
            error: "username " + username + " already exists",
          });
        } else if (userDoc[0].email === email) {
          return res
            .status(409)
            .json({ error: "email " + email + " already exists" });
        }
      }

      //Verify Password
      bcrypt.genSalt(10, function (err, salt) {
        if (err) return res.status(500).json({ error: err });

        bcrypt.hash(password, salt, function (err, hash) {
          if (err) return res.status(500).json({ error: err });

          const regUserItem = new user({
            username: username,
            password: hash,
            email: email,
          });

          regUserItem
            .save()
            .then((data) => {
              req.session.username = username;
              res.setHeader(
                "Set-Cookie",
                cookie.serialize("username", username, {
                  path: "/",
                  maxAge: 60 * 60 * 24 * 7,
                })
              );
              return res.status(201).json({ username: username, email: email });
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
  const requiredSchema = ["username", "password"];
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

  var username = sanitize(req.body.username);
  var password = sanitize(req.body.password);

  user.findOne({ username: username }, function (err, userDoc) {
    if (err) return res.status(500).json({ error: err });
    if (!userDoc) return res.status(401).json({ err: "Invalid username" });

    bcrypt.compare(password, userDoc.password, function (err, result) {
      if (err) return res.status(500).json({ error: err, status: 500 });
      if (!result) return res.status(401).json({ err: "Invalid Password" });
      // initialize cookie

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("username", username, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      );
      req.session.username = username;
      return res.status(200).json({ username: username });
    });
  });
});

router.put("/resetPassword/", function (req, res, next) {
  if (!req.body.email) {
    res.status(400).json({
      error: "Missing Email",
    });
  }

  if (!req.body.resetCode) {
    res.status(400).json({
      error: "Missing reset Code",
    });
  }

  if (!req.body.password) {
    res.status(400).json({
      error: "Missing new password",
    });
  }

  var email = sanitize(req.body.email);
  var password = sanitize(req.body.password);

  user.findOne({ email: email }, function (err, userDoc) {
    if (err) return res.status(500).json({ error: err });
    if (!userDoc) return res.status(401).json({ error: "Invalid email" });
    else if (userDoc) {
      ResetPassword.findOne(
        { resetCode: sanitize(req.body.resetCode) },
        function (err, resetItem) {
          if (err) return res.status(500).json({ error: err });
          if (!resetItem)
            return res.status(401).json({ error: "Invalid reset Code" });
          let date = new Date();

          //Check if 15 mins has pasted since we sent in verification
          if (date.getTime() > resetItem.createdAt.getTime() + 900000) {
            return res.status(410).json({ error: "Reset Code has expired" });
          } else {
            bcrypt.genSalt(10, function (err, salt) {
              if (err) return res.status(500).json({ error: err });

              bcrypt.hash(password, salt, function (err, hash) {
                if (err) return res.status(500).json({ error: err });

                user.updateOne(
                  { email: email },
                  { $set: { password: hash } },
                  function (err, response) {
                    if (err) return res.status(500).json({ error: err });

                    return res
                      .status(200)
                      .json({ status: "Password Successfuly Updated" });
                  }
                );
              });
            });
          }
        }
      );
    }
  });
});

router.put("/forgotPassword/", function (req, res, next) {
  if (!req.body.email) {
    res.status(400).json({
      error: "Invalid Email",
    });
  }

  user.findOne({ email: req.body.email }, function (err, userDoc) {
    if (err) return res.status(500).json({ error: err });
    if (!userDoc) return res.status(401).json({ error: "Invalid email" });

    const code = crypto.randomBytes(8).toString("hex");

    const resetPwdItem = new ResetPassword({
      email: req.body.email,
      resetCode: code,
    });

    resetPwdItem
      .save()
      .then(() => {
        let emailOptions = {
          from: "treyarchc09@hotmail.com",
          to: req.body.email,
          subject: "Fight Club password reset",
          text:
            "Your follow password reset code is " +
            code +
            ". Code Expires in 15 minutes",
        };

        sendEmail(emailOptions);
        return res.status(200).json({ msg: "Recovery email with code sent" });
      })
      .catch((err) => {
        return res.status(500).json({ error: err });
      });
  });
});

router.get("/", authMiddleware, function (req, res, next) {
  if ((req.user && req.user.username) || req.session.username) {
    const user = (req.user && req.user.username) || req.session.username;
    res.json({ user: { username: user } });
  } else {
    res.json({ user: {} });
  }
});

router.get("/logout/", function (req, res, next) {
  if (req.user || (req.session && req.session.username)) {
    if (req.user) {
      req.user = {};
      req.logout((err) => {
        return res.status(500).json({ error: err });
      });
    } else if (req.session && req.session.username) {
      req.session.username = "";
      req.session.destroy();
    }
    return res.status(200).json({ message: "Succesfully logged out" });
  } else {
    return res.status(404).json({ message: "No user to logout" });
  }
});

module.exports = router;
