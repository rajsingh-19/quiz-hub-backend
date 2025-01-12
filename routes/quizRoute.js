const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");
const { createQuizHandler, allQuizzesHandler, getSubsByCatHandler, getSubByIdHandler } = require("../controller/quizController");

router.post('/admin/quiz', createQuizHandler);
router.get('/quizzes', allQuizzesHandler);
router.get('/quiz', getSubsByCatHandler);
router.get('/quiz/sub/:id', verifyUser, getSubByIdHandler);

module.exports = router;
