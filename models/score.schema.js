const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    subId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
    },
    rightAns: {
        type: Number,
        required: true
    },
    wrongAns: {
        type: Number,
        required: true
    }
});

const ScoreModel = mongoose.model("Score", scoreSchema);

module.exports = ScoreModel;
