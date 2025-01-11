const express = require("express");
const router = express.Router();
const { createQuizHandler, allQuizzesHandler, getSubsByCatHandler } = require("../controller/quizController");

router.post('/admin/quiz', createQuizHandler);
router.get('/quizzes', allQuizzesHandler);
router.get('/quiz', getSubsByCatHandler);

module.exports = router;
