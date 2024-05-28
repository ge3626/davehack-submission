const getUsersIFollow = `SELECT following_user_id FROM follows WHERE followed_user_id = $1`;
const getUsersFollowMe = `SELECT followed_user_id FROM follows WHERE following_user_id = $1`;
const countUsersIFollow = `SELECT COUNT(*) FROM follows WHERE followed_user_id = $1`;
const countUsersFollowMe = `SELECT COUNT(*) FROM follows WHERE following_user_id = $1`;
const followUser = `INSERT INTO follows (following_user_id, followed_user_id) VALUES ($1, $2)`;
const unFollowUser = `DELETE FROM follows WHERE following_user_id = $1 AND followed_user_id = $2`;
const getUsersIFollowInFormat = `
SELECT 
    f.following_user_id,
    u.username,
    u.profile_img
FROM follows f
JOIN users u ON f.following_user_id = u.id
WHERE followed_user_id = $1;
`;
const getUsersFollowMeInFormat = `
SELECT 
    f.followed_user_id AS userid,
    u.username,
    u.profile_img,
    EXISTS (
        SELECT 1
        FROM follows
        WHERE followed_user_id = $1 AND following_user_id = f.followed_user_id
    ) AS isfollowing
FROM follows f
JOIN users u ON f.followed_user_id = u.id
WHERE following_user_id = $1;
`;

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