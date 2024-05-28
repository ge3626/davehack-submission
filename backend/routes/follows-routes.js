const express = require('express');
const router = express.Router();
const controller = require('../controllers/follows-controller');

router.get('/following/format/:followed_user_id', controller.getUsersIFollowInFormat);
router.get('/followers/format/:following_user_id', controller.getUsersFollowMeInFormat);
router.get('/following/:followed_user_id', controller.getUsersIFollow);
router.get('/followers/:following_user_id', controller.getUsersFollowMe);
router.get('/following/count/:followed_user_id', controller.countUsersIFollow);
router.get('/followers/count/:following_user_id', controller.countUsersFollowMe);

router.post('/follow', controller.followUser);

router.delete('/unfollow', controller.unFollowUser);

module.exports = router;