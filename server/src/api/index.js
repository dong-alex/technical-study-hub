require('dotenv').config();

const express = require('express');
const questions = require('./questions');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/questions', questions);

module.exports = router;
