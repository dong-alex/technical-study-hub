require("dotenv").config();

const mongoose = require("mongoose");
const username = encodeURIComponent(process.env.MONGO_USER);
const password = encodeURIComponent(process.env.MONGO_PASS);
const uri = `mongodb+srv://${username}:${password}@leetcode-notes.ybgks.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

(() => {
  mongoose
    .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
      console.log("Connected to database");
    });
})();

module.exports = mongoose;
