const express = require("express");
const router = express.Router();
const { scoreHandler, getScoreByQuizIdHandler, getAllScoresHandler } = require('../controller/scoreController');
const verifyUser = require("../middleware/verifyUser");

router.post('/:subId', verifyUser, scoreHandler);
router.get('/:quizId', verifyUser, getScoreByQuizIdHandler);
router.get('/sub/:subId', verifyUser, getAllScoresHandler);

module.exports = router;
