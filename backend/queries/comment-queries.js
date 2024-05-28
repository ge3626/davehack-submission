const getCommentById = `SELECT * FROM comments_quiz WHERE id = $1`;
const getCommentsByUserId = `SELECT * FROM comments_quiz WHERE user_id = $1`;
const getCommentsInThread = `SELECT * FROM comments_quiz WHERE thread_id = $1`;
const getCommentsInThreadInFormat = `
    SELECT 
        c.id,
        c.content,
        c.comment_replied_to_id,
        TO_CHAR(c.created_at, 'Mon DD, YYYY, HH12:MI AM') AS created_at,
        CASE 
        WHEN c.modified_at IS NOT NULL THEN TO_CHAR(c.modified_at, 'Mon DD, YYYY, HH12:MI AM')
        ELSE NULL
        END AS modified_at,
        u.username,
        u.profile_img
    FROM comments_quiz c
    JOIN users u ON c.user_id = u.id
    WHERE thread_id = $1;
`;
const getRepliedCommentsInFormat = `
    SELECT 
        c.id,
        c.content,
        c.comment_replied_to_id,
        TO_CHAR(c.created_at, 'Mon DD, YYYY, HH12:MI AM') AS created_at,
        u.username,
        u.profile_img
    FROM comments_quiz c
    JOIN users u ON c.user_id = u.id
    WHERE c.comment_replied_to_id = $1;
`;
const createNewComment = `
INSERT INTO comments_quiz 
(content, thread_id, user_id, comment_replied_to_id)
VALUES ($1, $2, $3, $4);
`;
const updateComment = `
    UPDATE comments_quiz 
    SET content = COALESCE($1, content) 
    WHERE id = $2;
`;
const deleteCommentById = `DELETE FROM comments_quiz WHERE id = $1;`;

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
