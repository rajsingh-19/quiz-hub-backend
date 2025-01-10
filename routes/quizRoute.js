const express = require("express");
const router = express.Router();
const { createQuizHandler, allQuizzesHandler } = require("../controller/quizController");

router.post('/admin/quiz', createQuizHandler);
router.get('/quizzes', allQuizzesHandler);

module.exports = router;
