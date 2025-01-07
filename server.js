const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/dbConfig");
const userRoute = require("./routes/userRoute");

const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3120;      //PORT for running the server


app.use('/auth', userRoute);

//          Home route to check if the sevrer is up nd running
app.get('/', (req, res) => {
    res.send("Quiz Hub Server Established");
});

//          wait for the db connection before starting the server
mongoose.connection.once('open', () => {
    console.log("Database Connected");
    //      starting the server after the db connection is established
    app.listen(PORT, () => {
        console.log("Server is runnning on the port", PORT);
    });    
});

//          error handling for db connection issues
mongoose.connection.on('error', (error) => {
    console.log(`Database Connection Error : ${error}`);
});