const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("../passport");
const validationSchema = require("../validation/userSchema");

router.post("/register", async (req, res, next) => {
  try {
    const result = await validationSchema.validateAsync(req.body);
    const exists = await User.findOne({ email: result.email });
    if (exists)
      throw Error("Another user exists with this email. Please try again.");

    let newUser = new User(result);

    const document = await newUser.save(); // can throw uesrname taken error

    return res.status(200).json({
      message: "New user registered. Please login.",
      user: document,
    });
  } catch (err) {
    if (err.isJoi === true) err.status = 422;
    next(err);
  }
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
    // returns a JWT after approval
    return res.status(200).json({
      message: "Login successful!",
      user: req.user,
      token: req.user.generateVerificationToken(),
    });
  }
);

// passport internal functionality
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  (req, res, next) => {
    return res.status(200).json({
      message: "Obtained user information",
      user: req.user,
    });
  }
);

module.exports = router;
