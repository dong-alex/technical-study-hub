require("dotenv").config();

const User = require("./models/User");
var passport = require("passport"),
  JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt,
  LocalStrategy = require("passport-local").Strategy;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

// authorizing requests
passport.use(
  new JwtStrategy(opts, (jwtPayload, done) => {
    User.findById(jwtPayload.sub)
      .then((user) => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);

// authenticating the users for the JWT
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password", session: false },
    (email, password, done) => {
      // if valid input - check if the user is in the system
      User.findOne({ email: email }, async (err, user) => {
        if (err) {
          console.log(err);
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }

        // run through the promise first
        const validPassword = await user.comparePassword(password);
        if (!validPassword) {
          return done(null, false);
        }

        delete user._doc.password;

        return done(null, user);
      });
    }
  )
);

module.exports = passport;
