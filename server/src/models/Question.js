const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 125,
  },
  url: {
    type: String,
    minLength: 20, // should contain leetcode.com/problems/...
    maxLength: 300,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  tags: [
    {
      // typeId
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
      default: null,
    },
  ],
  notes: [
    {
      type: String,
      default: null,
    },
  ],
  userId: {
    // userId
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;
