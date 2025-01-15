const express = require("express");
const router = express.Router();
const { scoreHandler, getScoreByQuizIdHandler } = require('../controller/scoreController');
const verifyUser = require("../middleware/verifyUser");

router.post('/:subId', verifyUser, scoreHandler);
router.get('/:quizId', verifyUser, getScoreByQuizIdHandler);

module.exports = router;
