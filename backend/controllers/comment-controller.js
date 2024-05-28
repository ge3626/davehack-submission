const queries = require('../queries/comment-queries'); 
const { pool } = require('../config');

const getCommentById = (req, res) => {
    const id = req.params.id;

    pool.query(queries.getCommentById, [id], (error, results) => {
        if(error) throw error;
        if(!results.rows.length) {
            return res.status(404).send('This comment does not exist.');
        }
        res.status(200).json(results.rows);
    });
}

const getCommentsByUserId = (req, res) => {
    const user_id = req.params.user_id;

    pool.query(queries.getCommentsByUserId, [user_id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const getCommentsInThread = (req, res) => {
    const thread_id = req.params.thread_id;
    
    pool.query(queries.getCommentsInThread, [thread_id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getCommentsInThreadInFormat = (req, res) => {
    const thread_id = req.params.thread_id;

    pool.query(queries.getCommentsInThreadInFormat, [thread_id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getRepliedCommentsInFormat = (req, res) => {
    const comment_id = req.params.comment_id;

    pool.query(queries.getRepliedCommentsInFormat, [comment_id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const createNewComment = (req, res) => {
    const { content, thread_id, user_id, comment_replied_to_id } = req.body;

    pool.query(queries.createNewComment, [content, thread_id, user_id, comment_replied_to_id], (error, results) => {
        if(error) throw error;
        res.status(201).json({ isSuccess: true });
    });
}

const updateComment = (req, res) => {
    const id = req.params.id;
    const { content } = req.body;

    pool.query(queries.getCommentById, [id], (error, results) => {
        if(!results.rows.length) {
            return res.status(404).json({ isUpdated: false, message: "This comment does not exist."});
        }

        pool.query(queries.updateComment, [content, id], (error, results) => {
            if(error) throw error;
            res.status(200).json({ isUpdated: true });
        });
    });
}

const deleteCommentById = (req, res) => {
    const id = req.params.id;

    pool.query(queries.getCommentById, [id], (error, results) => {
        if(!results.rows.length) {
            return res.status(404).json({ isDeleted: false, message: "This comment does not exist."});
        }

        pool.query(queries.deleteCommentById, [id], (error, results) => {
            if(error) throw error;
            res.status(200).json({ isDeleted: true });
        });
    });
}

module.exports = {
    getCommentById,
    getCommentsByUserId,
    getCommentsInThread,
    getCommentsInThreadInFormat,
    getRepliedCommentsInFormat,
    createNewComment,
    updateComment,
    deleteCommentById
}