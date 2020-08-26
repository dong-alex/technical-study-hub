const mongoose = require("mongoose");
const colorValidator = (v) => /^#([0-9a-f]{3}){1,2}$/i.test(v);

const tagSchema = new mongoose.Schema({
  tagName: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 20,
  },
  tagColor: {
    type: String,
    validate: [colorValidator, "Invalid color format."],
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const Tag = new mongoose.model("Tag", tagSchema);

module.exports = Tag;
