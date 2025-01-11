const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const UserModel = require("../models/user.schema");
const QuizModel = require("../models/quiz.schema");

dotenv.config();

//      api service for user register 
const registerUser = async (name, email, password) => {
    const isUserExist = await UserModel.findOne({ email });

    if(isUserExist) {
        const error = new Error("A User already exist with this email");
        error.status = 400;
        throw error;           //Throwing the error to the controller
    };

    //  Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
        name,
        email,
        password: hashPassword
    });
        
    return newUser;            // Return created user object
};

//      api service for user login
const loginUser = async (email, password) => {
    const isUserValid = await UserModel.findOne({ email });

    if(!isUserValid) {
        const error = new Error("This email is not associated with any account");
        error.status = 400;
        throw error;
    };

    const isPasswordValid = await bcrypt.compare(password, isUserValid.password);

    if(!isPasswordValid) {
        const error = new Error("Credential is wrong");
        error.status = 400;
        throw error;
    };

    //   Set the mongodb user id as payload 
    const payload = {
        id: isUserValid._id
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}; 

//      api service for quiz creation 
const createQuiz = async (data) => {
    const { categoryName, subjectName, description, imgUrl, quizQuesOpt } = data;

    const isSubjectExist = await QuizModel.findOne({ subjectName });

    if(isSubjectExist) {
        const error = new Error("This subject already exist");
        error.status = 400;
        throw error;  
    };

    const result = await QuizModel.create({
        categoryName,
        subjectName,
        description, 
        imgUrl, 
        quizQuesOpt
    });

    return result;
};


//  api for geting all the subject quizzes
const getAllQuizzes = async () => {
    const quizzes = await QuizModel.find();

    if(!quizzes || quizzes.length === 0) {
        const error = new Error("Quizzes not found");
        error.status = 400;
        throw error;
    };

    return quizzes;
};


//  api for subject quizzes by category name
const getSubByCategory = async (category) => {
    const filteredSubjects = await QuizModel.find({ categoryName: category });

    if(!filteredSubjects) {
        const error = new Error("This category is not available");
        error.status = 400;
        throw error;
    };

    return filteredSubjects;
};

module.exports = { registerUser, loginUser, createQuiz, getAllQuizzes, getSubByCategory };
