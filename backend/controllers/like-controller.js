const queries = require('../queries/like-queries');
const { pool } = require('../config');

const getLikesCount = (req, res) => {
    const { thread_id } = req.params;
    
    pool.query(queries.getLikesCount, [thread_id], (error, results) => {
        if(error) throw error;
        res.status(200).json({ count: results.rows[0].count });
    });
}

const likeThread = (req, res) => {
    const { user_id, thread_id } = req.body;
   
    pool.query(queries.likeThread, [user_id, thread_id], (error, results) => {
        if(error) throw error;
        res.status(200).json({ isSuccess: true });
    });
}

const unlikeThread = (req, res) => {
    const { user_id, thread_id } = req.query;
    
    pool.query(queries.unlikeThread, [user_id, thread_id], (error, results) => {
        if(error) throw error;
        res.status(200).json({ isDeleted: true });
    });
}

const checkIfUserLiked = (req, res) => {
    const { user_id, thread_id } = req.query;

    pool.query(queries.checkIfUserLiked, [user_id, thread_id], (error, results) => {
        if(error) throw error;
        const liked = results.rowCount > 0;
        res.status(200).json({ liked: liked });
    })
}

module.exports = {
    getLikesCount,
    likeThread,
    unlikeThread,
    checkIfUserLiked
}