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
    }
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
