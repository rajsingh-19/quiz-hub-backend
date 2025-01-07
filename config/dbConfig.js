const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;
