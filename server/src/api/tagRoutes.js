const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("../passport");
const Tag = require("../models/Tag");
const e = require("express");

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

router.post(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  (req, res, next) => {
    Tag.findOne({ tagName: req.body.tagName }, async (err, tag) => {
      if (err) {
        console.log(err);
        next(err);
      }

      if (tag) {
        console.log("Duplicate");
        return res.status(422).json({
          message:
            "There is a tag name that exists - please try a different name.",
        });
      }

      let newTag = new Tag({
        tagName: req.body.tagName,
        tagColor: req.body.tagColor,
        userId: req.user._id,
      });

      try {
        const document = await newTag.save();

        return res.status(200).json({
          message: "New tag registered",
          tag: document,
        });
      } catch (err) {
        console.log("Save error", err.message);
        return res.status(422).json({
          message: "There was an error saving your new tag. Please try again.",
        });
      }
    });
  }
);

router.put(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  (req, res, next) => {
    Tag.findOneAndUpdate(
      { _id: req.body.tagId },
      { tagName: req.body.tagName, tagColor: req.body.tagColor },
      { upsert: true },
      async (err, tag) => {
        if (err) {
          console.log(err);
          next(err);
        }

        if (tag) {
          return res.status(200).json({
            message: "Tag has been updated",
            tag: tag,
          });
        }
      }
    );
  }
);

router.delete(
  "/:tagId",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  (req, res, next) => {
    Tag.findByIdAndDelete(req.params.tagId, {}, async (err, success) => {
      if (err) {
        console.log(err);
        next(err);
      }

      if (success) {
        return res.status(200).json({
          message: "Tag has been deleted",
          success: success,
        });
      } else {
        console.log(success);
      }
    });
  }
);
// router.put(
//   "/tag/:questionId",
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
