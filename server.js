const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const PORT = 3120;

const app = express();




app.get('/', (req, res) => {
    res.send(200).json({ message: "Quiz Hub Backend Server" });
});


app.listen(PORT, () => {
    console.log(`Server is running on the ${PORT}`);
});

