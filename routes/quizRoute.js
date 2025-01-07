const express = require("express");
const router = express.Router();
const quizHandler = require("../controller/quizController");

router.post('/admin/quiz', quizHandler);

module.exports = router;
