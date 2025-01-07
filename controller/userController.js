const dotenv = require("dotenv");
const { registerUser } = require("../services/services");

dotenv.config();

const registerHandler = async (req, res) => {
    const { name, email, password } =  req.body;

    try {
        //  Check if the user exists in the db 
        const result = await registerUser(name, email, password);

        return res.status(201).json({ message: "Registered Successfully", user: result });
    } catch (error) {
        console.error(error);

        if(error.status) {
            return res.status(error.status).json({ message: error.message });
        };

        return res.status(500).json({ message: "An error occured" });
    }
}

module.exports = { registerHandler };
