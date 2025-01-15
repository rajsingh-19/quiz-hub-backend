const { createScore, getScore, updateScore, getScoreByQuizId } = require("../services/index");

const scoreHandler = async (req, res) => {
    const { subId } = req.params;
    const { userId, score, rightAns, wrongAns } = req.body;

    if(!subId) {
        return res.status(400).json({ message: "Subject id is not available"});
    };

    if(!userId || !score || !rightAns || !wrongAns ) {
        return res.status(400).json({ message: "All fields are required" });
    };

    const scoreDetails = { subId, userId, score, rightAns, wrongAns };

    try { 
        // Check if the user has already played this subject quiz
        const existingScore = await  getScore(subId, userId);

        if(existingScore) {
            // Score Updation
            const newScore = await updateScore(existingScore._id, scoreDetails);

            return res.status(201).json({ message: "Score updated successfully", newScore});
        } else {
            const newScore = await createScore(scoreDetails);

            return res.status(201).json({ message: "Score created successfully", newScore});
        }
    } catch (error) {
        console.error(error);

        if(error.status) {
            return res.status(error.status).json({ message: error.message });
        };

        return res.status(500).json({ message: "An Error Occured" });
    }
};

const getScoreByQuizIdHandler = async (req, res) => {
    const { quizId } = req.params;

    if(!quizId) {
        return res.status(400).json({ message: "User Id is required" });
    };
     
    try {
        const result = await getScoreByQuizId(quizId);

        return res.status(200).json({ message: "Score fetched", result });
    } catch(error) {
        console.error(error);

        if(error.status) {
            return res.status(error.status).json({ message: error.message });
        };

        return res.status(500).json({ message: "An Error Occured" });
    }
};

module.exports = { scoreHandler, getScoreByQuizIdHandler };
