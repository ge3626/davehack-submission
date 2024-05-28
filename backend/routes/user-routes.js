const express = require('express');

const router = express.Router();
const controller = require('../controllers/user-controller');

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.status(401);
    }
}

router.get('/', controller.getUsers);
router.get('/with-follows', controller.getAllUsersWithFollows);
router.get('/logout', controller.signOutAccount);
router.get('/name/:username', controller.getUserByName);
router.get('/email/:email', controller.getUserByEmail);
router.get('/:id', controller.getUserById);

router.post('/register', controller.createNewUser);
router.post('/login', controller.signInAccount);

router.patch('/:id', isAuth, controller.updateUser);

router.delete('/:id', isAuth, controller.deleteUserByID);
router.delete('/', isAuth, controller.deleteUserByName);
router.delete('/', isAuth, controller.deleteUserByEmail);

module.exports = router;