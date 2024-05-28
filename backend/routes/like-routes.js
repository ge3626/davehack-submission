const express = require('express');
const router = express.Router();
const controller = require('../controllers/like-controller');

router.get('/count/:thread_id', controller.getLikesCount);
router.get('/check', controller.checkIfUserLiked);

router.post('/', controller.likeThread);

router.delete('/unlike', controller.unlikeThread);

module.exports = router;