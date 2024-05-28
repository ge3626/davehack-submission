const getLikesCount = `
    SELECT COUNT(*) FROM likes_quiz
    WHERE thread_id = $1;
`;
const likeThread = `
    INSERT INTO likes_quiz (user_id, thread_id) 
    VALUES ($1, $2)
    ON CONFLICT (user_id, thread_id) DO NOTHING;
`;
const unlikeThread = `
    DELETE FROM likes_quiz
    WHERE user_id = $1 AND thread_id = $2
`;
const checkIfUserLiked = `
    SELECT 1 FROM likes_quiz 
    WHERE user_id = $1 AND thread_id = $2
`;

module.exports = {
    getLikesCount,
    likeThread,
    unlikeThread,
    checkIfUserLiked
}
