require("dotenv").config();

const express = require("express");
const questions = require("./questions");

const router = express.Router();

router.use("/questions", questions);

module.exports = router;
