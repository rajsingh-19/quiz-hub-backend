const { createScore } = require("../services/index");

const scoreHandler = async (req, res) => {
    const { quizId } = req.params;
    const { userId, score, rightAns, wrongAns } = req.body;

    if(!quizId) {
        return res.status(400).json({ message: "quiz id is not available"});
    };

    if(!userId || !score || !rightAns || !wrongAns ) {
        return res.status(400).json({ message: "All fields are required" });
    };

    const scoreDetails = { quizId, userId, score, rightAns, wrongAns };

    try {
        const newScore = await createScore(scoreDetails);

        return res.status(201).json({ message: "Score created successfully", newScore});
    } catch (error) {
        console.error(error);

        if(error.status) {
            return res.status(error.status).json({ message: error.message });
        };

        return res.status(500).json({ message: "An Error Occured" });
    }
};

module.exports = scoreHandler;
