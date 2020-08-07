const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("../passport");
const Tag = require("../models/Tag");
const Question = require("../models/Question");

router.get(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  (req, res, next) => {
    Question.find(
      { userId: mongoose.Types.ObjectId(req.user._id) },
      (err, docs) => {
        if (err) {
          next(err);
        } else {
          res.json({
            message: "Succesfully obtained all questions for the user",
            questions: docs,
            user: req.user._id,
          });
        }
      }
    ).populate("tags");
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  async (req, res, next) => {
    try {
      // customized based on request body - requires some kind of ID - can be generated
      const newQuestion = new Question({
        name: req.body.name,
        difficulty: req.body.difficulty,
        tags: req.body.tags,
        userId: mongoose.Types.ObjectId(req.user._id),
      });

      const document = await newQuestion.save();
      res.json({
        message: "Succesfully added the following question into the database",
        question: document,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

module.exports = router;
