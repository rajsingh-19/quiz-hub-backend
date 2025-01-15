const express = require("express");
const router = express.Router();
const { scoreHandler, getScoreHandler } = require('../controller/scoreController');
const verifyUser = require("../middleware/verifyUser");

router.post('/:subId', verifyUser, scoreHandler);
router.get('/:userId', verifyUser, getScoreHandler);

module.exports = router;
