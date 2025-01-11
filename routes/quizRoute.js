const express = require("express");
const router = express.Router();
const { createQuizHandler, allQuizzesHandler, getSubsByCatHandler, getSubByIdHandler } = require("../controller/quizController");

router.post('/admin/quiz', createQuizHandler);
router.get('/quizzes', allQuizzesHandler);
router.get('/quiz', getSubsByCatHandler);
router.get('/quiz/sub/:id', getSubByIdHandler);

module.exports = router;
