const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    ScoreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Score"   
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
    }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
