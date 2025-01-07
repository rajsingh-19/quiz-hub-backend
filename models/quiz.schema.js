const mongoose = require("mongoose");

const quizSchema =  new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    subjectName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    quizQuesOpt: [
        {
            difficulty: {
                type: String,
                required: true
            },
            question: {
                type: String,
                required: true
            },
            options: [{
                option: {
                    type: String,
                    required: true
                }
            }],
            correctOption: {
                type: String,
                required: true
            }
        }
    ]
});

const QuizModel = mongoose.model("Quiz", quizSchema);

module.exports = QuizModel;
