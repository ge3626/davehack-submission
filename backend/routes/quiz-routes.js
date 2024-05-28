const express = require('express');
const router = express.Router();
const controller = require('../controllers/quiz-controller');

router.get('/user/:user_id', controller.getAllQuizsYouTook);
router.get('/wrong/:user_id', controller.getQuizsGotWrong);
router.get('/:id', controller.getQuizById);

router.post('/:user_id', controller.createNewQuiz);

router.delete('/:id', controller.deleteQuiz);

module.exports = router;