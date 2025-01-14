const express = require("express");
const router = express.Router();
const scoreHandler = require('../controller/scoreController');
const verifyUser = require("../middleware/verifyUser");

router.post('/:quizId', verifyUser, scoreHandler);

module.exports = router;
