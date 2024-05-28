const queries = require('../queries/thread-queries');
const { pool } = require('../config');

const getAllThreads = (req, res) => {
    pool.query(queries.getAllThreads, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getThreadsByUserID = (req, res) => {
    const user_id = req.params.user_id;
    
    pool.query(queries.getThreadsByUserID, [user_id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getAllThreadsInFormat = (req, res) => {
    pool.query(queries.getAllThreadsInFormat, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getThreadById = (req, res) => {
    const id = req.params.id;

    pool.query(queries.getThreadById, [id], (error, results) => {
        if(error) throw error;
        if(!results.rows.length) {
            return res.status(404).json({ message: "This thread does not exist."});
        }
        res.status(200).json(results.rows);
    });
}

const addNewThread = (req, res) => {
    const user_id = req.params.user_id;
    const { quiz_id, content } = req.body;

    pool.query(queries.addNewThread, [quiz_id, content, user_id], (error, results) => {
        if(error) throw error;
        const newThread = {
            quiz_id,
            content,
            user_id
        }
        res.status(201).json({ isSuccess: true, newThread: newThread });
    });
}

const updateThread = (req, res) => {
    const id = req.params.id;
    const { quiz_id, content } = req.body;

    pool.query(queries.getThreadById, [id], (error, results) => {
        if(!results.rows.length) {
            return res.status(404).json({ isUpdated: false, message: "This thread does not exist."});
        }

        pool.query(queries.updateThread, [content, quiz_id, id], (error, results) => {
            if (error) throw error;
            res.status(200).json({ isUpdated: true });
        });
    });

}

const deleteThread = (req, res) => {
    const id = req.params.id;

    pool.query(queries.getThreadById, [id], (error, results) => {
        if(!results.rows.length) {
            return res.status(404).json({ isDeleted: false, message: "This thread does not exist."});
        }

        pool.query(queries.deleteThreadById, [id], (error, results) => {
            if (error) throw message;
            res.status(200).json({ isDeleted: true });
        });
    });
}

module.exports = {
    getAllThreads,
    getThreadsByUserID,
    getAllThreadsInFormat,
    getThreadById,
    addNewThread,
    updateThread,
    deleteThread
}