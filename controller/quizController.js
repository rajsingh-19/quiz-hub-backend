const { createQuiz } = require("../services/services");

const quizHandler = async (req, res) => {
    const { categoryName, subjectName, description, imgUrl, quizQuesOpt } = req.body;

    if(!categoryName || !subjectName || !description || !imgUrl || !quizQuesOpt) {
        return res.status(400).json({ message: "All fields are required" });
    };

    const data = { categoryName, subjectName, description, imgUrl, quizQuesOpt };

    try {
        const result = await createQuiz(data);

        return res.status(200).json({ message: "Quiz Created Successfully", result });
    } catch (error) {
        console.error(error);

        if(error.status) {
            return res.status(error.status).json({ message: error.message });
        };

        return res.status(500).json({ message: "An Error Occured" });
    }
};

module.exports =  quizHandler;
