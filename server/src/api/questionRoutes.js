const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("../passport");
const Tag = require("../models/Tag");
const Question = require("../models/Question");
const questionValidationSchema = require("../validation/questionSchema");

// all questions [restricted to user] GET /api/v1/questions
router.get(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  (req, res, next) => {
    console.log("Finding questions for ", req.user._id);
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
      const result = await questionValidationSchema.validateAsync(req.body);

      // convert tags into the objectId representation
      const tagIds = result.tags.map((stringId) =>
        mongoose.Types.ObjectId(stringId)
      );

      const newQuestion = new Question({
        ...result,
        tags: tagIds,
        userId: mongoose.Types.ObjectId(req.user._id),
      });

      const document = await newQuestion.save();
      return res.status(200).json({
        message: "Succesfully added the following question into the database",
        question: document,
      });
    } catch (err) {
      console.log(err);
      if (err.isJoi) err.status = 422;
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
        (err, removedQuestion) => {
          if (err) {
            console.log(err);
            next(err);
          }

          if (removedQuestion) {
            return res.status(200).json({
              message: "Question has been deleted",
              question: removedQuestion,
            });
          }

          throw Error("There was an error with deleting the question");
        }
      );
    } catch (err) {
      console.log("DELETE questions", err);
      next(err);
    }
  }
);

// update question PUT /api/v1/questions/:questionId
// updates for the basics
router.put(
  "/:questionId",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  async (req, res, next) => {
    try {
      // construct the object to update the question with
      const result = await questionValidationSchema.validateAsync(req.body);

      // convert tags into the objectId representation
      console.log(result);
      const tagIds = result.tags.map((stringId) =>
        mongoose.Types.ObjectId(stringId)
      );

      console.log(tagIds);
      const question = await Question.findOneAndUpdate(
        { _id: req.params.questionId },
        {
          ...result,
          tags: tagIds,
        },
        { upsert: true, new: true }
      ).populate("tags");
      // question updated - but need to grab the actual tags and not their ids for the client
      return res.status(200).json({
        message: "Question has been updated",
        question,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
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
