const bcrypt = require("bcrypt");
const UserModel = require("../models/user.schema");

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
}

module.exports = { registerUser };
