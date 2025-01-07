const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const UserModel = require("../models/user.schema");

dotenv.config();

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

const loginUser = async (email, password) => {
    const isUserValid = await UserModel.findOne({ email });

    if(!isUserValid) {
        const error = new Error("This email is not associated with any account");
        error.status = 400;
        throw error;
    };

    const isPasswordValid = bcrypt.compare(password, isUserValid.password);

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


module.exports = { registerUser, loginUser };
