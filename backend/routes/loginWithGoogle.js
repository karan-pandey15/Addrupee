import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as OAuth2Strategy } from "passport-google-oauth2";
import userModel from "./models/userModel.js";
import Customer from "../models/customerModels.js";

dotenv.config();

const clientId = process.env.CLIENTID;
const clientsecret = process.env.CLIENTSECRET;
const session_secret = process.env.SESSION_SECRET;
const callback_url = process.env.CALLBACK_URL;
const success_url = process.env.SUCCESS_URL;
const failure_url = process.env.FAILURE_URL;

const app = express();

app.use(express.json());

app.use(
  session({
    secret: session_secret,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: clientId,
      clientSecret: clientsecret,
      callbackURL: callback_url,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await Customer.findOne({ googleId: profile.id });

        if (!user) {
          user = new Customer({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });

          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Initialize Google OAuth Login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: success_url,
    failureRedirect: failure_url,
  })
);

app.get("/login/success", async (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "User Logged In",
      user: req.user,
    });
  } else {
    res.status(400).json({
      message: "User not Authorized",
    });
  }
});

app.get("/logout", (req, res, next) => {
  req.logout(function (error) {
    if (error) {
      return next(error);
    }
    res.redirect(origin);
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    Status: "Success",
    Message: "Server Started Successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
