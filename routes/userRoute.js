const express = require("express");
const router = express.Router();
const { registerHandler } = require("../controller/userController"); 

router.post('/register', registerHandler);

module.exports = router;
