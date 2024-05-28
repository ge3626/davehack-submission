const getQuizById = `SELECT * FROM quizs WHERE id = $1`;
const getAllQuizsYouTook = `SELECT * FROM quizs WHERE user_id = $1`;
const getQuizsGotWrong = `SELECT * FROM quizs WHERE user_id = $1 AND first_got_correct = false`;
const createNewQuiz = `INSERT INTO quizs (question, answer, first_got_correct, user_id) VALUES ($1, $2, $3, $4)`;
const deleteQuiz = 'DELETE FROM quizs WHERE id = $1';


module.exports = {
    getQuizById,
    getAllQuizsYouTook,
    getQuizsGotWrong,
    createNewQuiz,
    deleteQuiz
}