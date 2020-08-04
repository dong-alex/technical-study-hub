require("dotenv").config();

const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");

const router = express.Router();
const username = encodeURIComponent(process.env.MONGOOSE_USER);
const password = encodeURIComponent(process.env.MONGOOSE_PASS);
const uri = `mongodb+srv://${username}:${password}@leetcode-notes.ybgks.mongodb.net/${process.env.MONGOOSE_DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useUnifiedTopology: true });

router.get("/", async (req, res, next) => {
  try {
    await client.connect();
    const db = client.db("questions");
    // _id: 0 will ignore the field, setting a field to 1 will return that specifid field
    const cursor = db
      .collection("leetcode")
      .find({ difficulty: "EASY" })
      .project({ _id: 0 });
    const response = await cursor.toArray();

    res.json({
      message: "Succesfully obtained all questions",
      questions: response,
    });
  } catch (err) {
    next(err);
  } finally {
    await client.close();
  }
});

router.post("/", async (req, res, next) => {
  try {
    // parse the request body for the information - should be validated in front-end too
    if (
      !req.body.name ||
      !req.body.difficulty ||
      !req.body.notes ||
      !req.body.labels
    ) {
      throw new Error("Invalid parameters, please try again");
    }

    // insert the new question into the proper collection
    await client.connect();
    const db = client.db("questions");
    const col = db.collection("leetcode");

    // customized based on request body - requires some kind of ID - can be generated
    const questionDocument = {
      _id: uuidv4(),
      name: req.body.name,
      difficulty: req.body.difficulty,
      notes: req.body.notes,
      labels: req.body.labels,
    };

    await col.insertOne(questionDocument);

    res.json({
      message: "Succesfully added the following question into the database",
      question: questionDocument,
    });
  } catch (err) {
    next(err);
  } finally {
    await client.close();
  }
});

module.exports = router;
