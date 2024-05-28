const { pool } = require('../config');
const queries = require('../queries/quiz-queries');

const getQuizById = (req, res) => {
    const { id } = req.params;

    pool.query(queries.getQuizById, [id], (error, results) => {
        if(!results.rows.length) {
            return res.status(404).send("This quiz does not exist.");
        }
        if(error) throw error;
        res.status(200).json(results.rows[0]);
    });
}

const getAllQuizsYouTook = (req, res) => {
    const { user_id } = req.params;

    pool.query(queries.getAllQuizsYouTook, [user_id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getQuizsGotWrong = (req, res) => {
    const { user_id } = req.params;

    pool.query(queries.getQuizsGotWrong, [user_id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const createNewQuiz = (req, res) => {
    const { user_id } = req.params;
    const { question, answer, first_got_correct } = req.body;

    pool.query(queries.createNewQuiz, [question, answer, first_got_correct, user_id], (error, results) => {
        if(error) throw error;
        
        res.status(201).json({ isSuccess: true });
    });
}

const deleteQuiz = (req, res) => {
    const { id } = req.params;

    pool.query(queries.getQuizById, [id], (error, results) => {
        if(!results.rows.length) {
            return res.status(404).json({ isDeleted: false, message: "This quiz does not exist."});
        }

        pool.query(queries.deleteQuiz, [id], (error, results) => {
            if(error) throw error;
            res.status(200).json({ isDeleted: true });
        });
    });
}

module.exports = {
    getAllQuizsYouTook,
    getQuizById,
    getQuizsGotWrong,
    createNewQuiz,
    deleteQuiz
}