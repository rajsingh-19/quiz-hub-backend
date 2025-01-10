const dotenv = require("dotenv");
const { registerUser, loginUser } = require("../services/index");

dotenv.config();

const registerHandler = async (req, res) => {
    const { name, email, password } =  req.body;

    try {
        //  Check if the user exists in the db 
        const result = await registerUser(name, email, password);

        return res.status(201).json({ message: "Registered Successfully"});
    } catch (error) {
        console.error(error);

        if(error.status) {
            return res.status(error.status).json({ message: error.message });
        };

        return res.status(500).json({ message: "An error occured" });
    }
};

const loginHandler = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await loginUser(email, password);

        return res.status(200).json({ message: "Logged in Successfully", token: result });
    } catch (error) {
        console.error(error);
        
        if(error.status) {
            return res.status(error.status).json({ message: error.message });
        };

        return res.status(500).json({ message: "An Error Occured" });
    }
};

module.exports = { registerHandler, loginHandler };
