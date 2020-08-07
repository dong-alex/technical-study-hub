require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const middlewares = require("./middlewares");
const api = require("./api");
const passport = require("./passport");
const User = require("./models/User");
const app = express();
const fileUpload = require("express-fileupload");

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.use("/api/v1", api);

// registration routes
app.post("/register", async (req, res, next) => {
  // TODO: implement validation for passwords and names
  // validate that no other username or email is being used in the database
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return res.status(422).json({
        message: "There is a user with the same email. Please login.",
      });
    } else {
      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      // password gets hashed on save
      try {
        const document = await newUser.save();
        console.log("User has been registered. Please login", document);

        return res.status(200).json({
          message: "New user registered. Please login",
          user: document,
        });
      } catch (err) {
        return res.status(422).json({
          message: err.message,
        });
      }
    }
  });
});

app.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
    // returns a JWT after approval
    return res.json({
      user: req.user,
      token: req.user.generateVerificationToken(),
    });
  }
);

app.get(
  "/profile",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  (req, res, next) => {
    return res.json({
      user: req.user,
    });
  }
);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
