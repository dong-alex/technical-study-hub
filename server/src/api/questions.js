require("dotenv").config();

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const client = require("../database");
const passport = require("../passport");
const Tag = require("../models/Tag");
const Question = require("../models/Question");

router.get(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  (req, res, next) => {
    console.log(req.user);
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

router.put(
  "/tag/:questionId",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  async (req, res, next) => {
    // add the tag into the specific questionId
    console.log(req.params.questionId);
    const tag = new Tag({
      tagName: req.body.name,
      tagColor: req.body.color,
      userId: mongoose.Types.ObjectId(req.user._id),
    });

    const document = await tag.save();

    Question.findById(req.params.questionId, async (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
        docs.tags = [...docs.tags, mongoose.Types.ObjectId(tag._id)];
        await docs.save();
        console.log(docs);
        res.status(200).json({
          message: "Updated the question with a new tag",
        });
      }
    });
  }
);

module.exports = router;
