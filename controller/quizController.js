const { createQuiz, getAllQuizzes, getSubByCategory } = require("../services/index");

const createQuizHandler = async (req, res) => {
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

const allQuizzesHandler = async (req, res) => {
    try {
        const quizzes = await getAllQuizzes();

        // Extract the required field to send to the front end
        const filteredQuizzes = quizzes.map((quiz) => ({
            categoryName: quiz.categoryName,
            subjectName: quiz.subjectName,
            imgUrl: quiz.imgUrl,
            description: quiz.description,
            _id: quiz._id
        }));

        return res.status(200).json({ message: "All quizzes has fetched", filteredQuizzes });
    } catch (error) {
        console.error(error);
        
        if(error.status) {
            return res.status(error.status).json({ message: error.message });
        };

        return res.status(500).json({ message: "An Error Occured" });
    }
};

//     subject by category handler
const getSubsByCatHandler = async (req, res) => {
    const { category } = req.query;

    try {
        const subjects = await getSubByCategory(category);

        // Extract only required fileds to send to the fornt end
        const filteredQuizzes = subjects.map((quiz) => ({
            categoryName: quiz.categoryName,
            subjectName: quiz.subjectName,
            description: quiz.description,
            imgUrl: quiz.imgUrl,
            _id: quiz._id
        }));


        return res.status(200).json({ message: "Filtered Subjects are fetched", filteredQuizzes });
    } catch (error) {
        console.error(error);

        if(error.status) {
            return res.status(error.status).json({ message: error.message });
        };

        return res.status(500).json({ message: "An Error Occured" });
    }
};

module.exports =  { createQuizHandler, allQuizzesHandler, getSubsByCatHandler };
