const queries = require('../queries/follows-queries');
const { pool } = require('../config');

const getUsersIFollow = (req, res) => {
    const { followed_user_id }= req.params;

    pool.query(queries.getUsersIFollow, [followed_user_id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getUsersIFollowInFormat = (req, res) => {
    const { followed_user_id }= req.params;

    pool.query(queries.getUsersIFollowInFormat, [followed_user_id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getUsersFollowMe = (req, res) => {
    const { following_user_id } = req.params;

    pool.query(queries.getUsersFollowMe, [following_user_id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getUsersFollowMeInFormat = (req, res) => {
    const { following_user_id } = req.params;

    pool.query(queries.getUsersFollowMeInFormat, [following_user_id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    }); 
}

const countUsersIFollow = (req, res) => {
    const { followed_user_id }= req.params;

    pool.query(queries.countUsersIFollow, [followed_user_id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const countUsersFollowMe = (req, res) => {
    const { following_user_id } = req.params;

    pool.query(queries.countUsersFollowMe, [following_user_id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const followUser = (req, res) => {
    const { following_user_id, followed_user_id } = req.body;

    pool.query(queries.followUser, [following_user_id, followed_user_id], (error, results) => {
        if(error) throw error;
        res.status(200).json({ isSuccess: true });
    });
}

const unFollowUser = (req, res) => {
    const { following_user_id, followed_user_id } = req.query;

    pool.query(queries.unFollowUser, [following_user_id, followed_user_id], (error, results) => {
        if(error) throw error;
        res.status(200).json({ isDeleted: true });
    });
}

module.exports = {
    getUsersIFollow,
    getUsersFollowMe,
    countUsersIFollow,
    countUsersFollowMe,
    followUser,
    unFollowUser,
    getUsersIFollowInFormat,
    getUsersFollowMeInFormat
}