const express = require('express');
const router = express.Router();
const controller = require('../controllers/comment-controller');

router.get('/user/:user_id', controller.getCommentsByUserId);
router.get('/thread/format/:thread_id', controller.getCommentsInThreadInFormat);
router.get('/thread/:thread_id', controller.getCommentsInThread);
router.get('/reply/:comment_id', controller.getRepliedCommentsInFormat);
router.get('/:id', controller.getCommentById);

router.post('/', controller.createNewComment);

router.patch('/:id', controller.updateComment);

router.delete('/:id', controller.deleteCommentById);

module.exports = router;