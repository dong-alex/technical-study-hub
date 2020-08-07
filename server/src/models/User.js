require("dotenv").config();

const mongoose = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
    minLength: 5,
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please provide a valid email address"],
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// middleware function before attempting to save into the database
userSchema.pre("save", async function (next) {
  // checks for modification - could be implemented with name/email change
  if (!this.password || !this.isModified("password")) return next;

  console.log("Encrypting password");
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.post("save", function (error, doc, next) {
  // duplicate key error
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Username taken. Please try again."));
  } else {
    next();
  }
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  usernameLowercase: true,
  session: false, // using JWTs instead
});

// helper methods for each user
userSchema.methods.generateVerificationToken = function () {
  return jwt.sign(
    {
      userId: this._id,
      email: this.email,
    },
    process.env.SECRET_KEY,
    {
      algorithm: process.env.JWT_ALGORITHM,
      expiresIn: process.env.JWT_EXPIRY,
      subject: this._id.toString(),
    }
  );
};

userSchema.methods.toJSON = function () {
  const userObject = Object.assign({}, this._doc);
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
