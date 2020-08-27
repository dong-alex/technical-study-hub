const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("../passport");
const Tag = require("../models/Tag");
const Question = require("../models/Question");
const tagValidationSchema = require("../validation/tagSchema");

// get all tags from the user GET /api/v1/tags/
router.get(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  (req, res, next) => {
    Tag.find({ userId: mongoose.Types.ObjectId(req.user._id) }, (err, docs) => {
      if (err) {
        next(err);
      } else {
        return res.status(200).send({
          message: "Succesfully obtained all tags by user",
          tags: docs,
        });
      }
    });
  }
);

// get all questions associated to the tag GET /api/v1/tags/:tagId
// router.get(
//   "/:tagId",
//   passport.authenticate("jwt", { session: false, failWithError: true }),
//   (req, res, next) => {
//     Question.findById(req.params.tagId, (err, docs) => {
//       if (err) {
//         next(err);
//       } else {
//         return res.status(200).send({
//           message: "Succesfully obtained all tags for the question",
//           questions: docs,
//         });
//       }
//     });
//   }
// );

// create tag POST /api/v1/tags
router.post(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  async (req, res, next) => {
    try {
      // validate the incoming request body - throws an error on invalidity
      const result = await tagValidationSchema.validateAsync(req.body);
      const exists = await Tag.findOne({
        tagName: result.tagName,
        userId: mongoose.Types.ObjectId(req.user._id),
      });

      if (exists)
        throw Error("A tag with this name exists already. Please try again.");

      let newTag = new Tag({ ...result, userId: req.user._id });

      const document = await newTag.save();

      return res.status(200).json({
        message: "New tag has been saved.",
        tag: document,
      });
    } catch (err) {
      console.log("Error creating tag", err);
      if (err.isJoi) err.status = 422;
      console.log(err.message);
      next(err);
    }
  }
);

// update tags PUT /api/v1/tags/:tagId
router.put(
  "/:tagId",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  async (req, res, next) => {
    try {
      const result = await tagValidationSchema.validateAsync(req.body);
      const tag = await Tag.findByIdAndUpdate(req.params.tagId, result, {
        upsert: true,
        new: true,
      });

      return res.status(200).json({
        message: "Tag has been updated",
        tag: tag,
      });
    } catch (err) {
      if (err.isJoi === true) err.status = 422;
      next(err);
    }
  }
);

router.delete(
  "/:tagId",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  async (req, res, next) => {
    try {
      Tag.findByIdAndDelete(req.params.tagId);
      return res.status(200).json({
        message: "Tag has been deleted",
        success: true,
      });
    } catch (err) {
      next(err);
    }
  }
);

// tags question PUT /api/v1/tags/label/:questionId
// router.put(
//   "/label/:questionId",
//   passport.authenticate("jwt", { session: false, failWithError: true }),
//   async (req, res, next) => {
//     // add the tag into the specific questionId
//     let tag;
//     if (!req.body.tagId) {
//       if (!req.body.name || !req.body.color) {
//         return res.status(422).json({
//           message: "Missing parameters in your request. Please try again.",
//         });
//       }

//       // create new tag to be used for the question TODO: confirm tag already does not exist - cache?
//       tag = new Tag({
//         tagName: req.body.name,
//         tagColor: req.body.color,
//         userId: mongoose.Types.ObjectId(req.user._id),
//       });
//       await tag.save();
//     } else {
//       tag = await Tag.findById(req.body.tagId);
//       Question.findById(req.params.questionId, async (err, docs) => {
//         if (err) {
//           console.log(err);
//           return res.status(500).json({
//             message: "There was an error placing the tag on your question",
//           });
//         } else {
//           console.log(docs);
//           docs.tags = [...docs.tags, mongoose.Types.ObjectId(tag._id)];
//           await docs.save();
//           console.log(docs);
//           return res.status(200).json({
//             message: "Updated the question with a new tag",
//           });
//         }
//       });
//     }
//   }
// );

module.exports = router;
