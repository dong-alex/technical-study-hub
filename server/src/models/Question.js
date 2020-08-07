const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  difficulty: {
    type: String,
    enum: ["EASY", "MEDIUM", "HARD"],
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
  userId: {
    // userId
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;
