const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const user = require("../db/Models/UserSchema");

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: "969850809285-nv8oksir0hies132uu5d9vcljvkdt0je.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },

    function (request, accessToken, refreshToken, profile, done) {
      user.findOne({ googleId: profile.id }, async (err, doc) => {
        if (err) {
          return done(err, null);
        }

        if (!doc) {
          const newUser = new user({
            googleId: profile.id,
            username: profile.name.givenName,
            email: profile.emails[0].value,
          });

          await newUser.save();
          done(null, newUser);
        } else {
          done(null, doc);
        }
      });
    }
  )
);

router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "https://fight-club.tech/home",
    failureRedirect: "https://fight-club.tech/login",
  })
);

module.exports = router;
