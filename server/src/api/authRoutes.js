const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("../passport");

router.post("/register", async (req, res, next) => {
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

router.post(
	"/login",
	passport.authenticate("local", { session: false }),
	(req, res, next) => {
		// returns a JWT after approval
		return res.json({
			message: "Login successful!",
			user: req.user,
			token: req.user.generateVerificationToken(),
		});
	}
);

router.get(
	"/profile",
	passport.authenticate("jwt", { session: false, failWithError: true }),
	(req, res, next) => {
		console.log("User: ", req.user);
		return res.json({
			message: "Obtained user information",
			user: req.user,
		});
	}
);

module.exports = router;
