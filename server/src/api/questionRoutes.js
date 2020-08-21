const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("../passport");
const Tag = require("../models/Tag");
const Question = require("../models/Question");

// create the update object for questions based on available fields
const validateUpdateObject = (body) => {
  // validates if params are proper - should always be caught in client
  const bodySet = Object.keys(body);
  const schemaSet = new Set(Object.keys(Question.schema.tree));

  for (key in bodySet) {
    if (!schemaSet.has(key)) {
      return false;
    }
  }

  return true;
};

// all questions [restricted to user] GET /api/v1/questions
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

// new question POST /api/v1/questions/
router.post(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  async (req, res, next) => {
    try {
      // customized based on request body - requires some kind of ID - can be generated

      // convert tags into the objectId representation
      const tagIds = req.body.tags.map((stringId) =>
        mongoose.Types.ObjectId(stringId)
      );

      const newQuestion = new Question({
        name: req.body.name,
        difficulty: req.body.difficulty,
        tags: tagIds,
        notes: req.body.notes,
        userId: mongoose.Types.ObjectId(req.user._id),
      });

      const document = await newQuestion.save();
      return res.status(200).json({
        message: "Succesfully added the following question into the database",
        question: document,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

// delete question DELETE /api/v1/questions/:questionID
router.delete(
  "/:questionId",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  async (req, res, next) => {
    try {
      Question.findByIdAndDelete(
        req.params.questionId,
        {},
        async (err, success) => {
          if (err) {
            console.log(err);
            next(err);
          }

          if (success) {
            return res.status(200).json({
              message: "Question has been deleted",
              success: success,
            });
          } else {
            console.log(success);
          }
        }
      );
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

// update question PUT /api/v1/questions/:questionId
// updates for the basics
router.put(
  "/:questionId",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  (req, res, next) => {
    // construct the object to update the question with
    Question.findOneAndUpdate(
      { _id: req.params.questionId },
      {
        name: req.body.name,
        difficulty: req.body.difficulty,
        tags: req.body.tags,
        notes: req.body.notes,
      },
      { upsert: true },
      (err, question) => {
        console.log(err);
        if (err) {
          console.log(err);
          next(err);
        }

        if (question) {
          return res.status(200).json({
            message: "Question has been updated",
            question: question,
          });
        }
        return res.status(500).json({
          message: "Question not found",
          question: null,
        });
      }
    );
  }
);

// maybe needed?
// adds or updates a tag to the specific question PUT /api/v1/questions/label/:questionId
// router.put(
//   "/label/:questionId",
//   passport.authenticate("jwt", { session: false, failWithError: true }),
//   (req, res, next) => {
//     Question.findOneAndUpdate(
//       { _id: req.params.questionId },
//       { $push: { tags: mongoose.Types.ObjectId(req.body.tagId) } },
//       { upsert: true },
//       (err, question) => {
//         if (err) {
//           console.log(err);
//           next(err);
//         }

//         if (question) {
//           return res.status(200).json({
//             message: "Question has been updated",
//             question: question,
//           });
//         }
//         return res.status(500).json({
//           message: "Question not found",
//           question: null,
//         });
//       }
//     );
//   }
// );
// there is generally only a few tags assigned to a question.
// there can be tags with many questions
module.exports = router;
