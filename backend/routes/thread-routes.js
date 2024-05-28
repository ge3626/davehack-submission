const express = require('express');
const router = express.Router();
const controller = require('../controllers/thread-controller');

router.get('/', controller.getAllThreads);
router.get('/format', controller.getAllThreadsInFormat);
router.get('/user/:user_id', controller.getThreadsByUserID);
router.get('/:id', controller.getThreadById);

router.post('/user/:user_id', controller.addNewThread);

router.patch('/:id', controller.updateThread);

router.delete('/:id', controller.deleteThread);

module.exports = router;