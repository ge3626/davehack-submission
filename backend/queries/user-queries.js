const getUsers = 'SELECT * FROM users ORDER BY username ASC';
const getUserById = 'SELECT * FROM users WHERE id = $1';
const getUserByName = 'SELECT * FROM users WHERE username = $1';
const getUserByEmail = 'SELECT * FROM users WHERE email = $1';
const checkEmailExists = 'SELECT s FROM users s WHERE s.email = $1';
const checkNameExists = 'SELECT s FROM users s WHERE s.username = $1';
const addNewUser = 'INSERT INTO users (username, email, password, profile_img) VALUES ($1, $2, $3, $4)';
const updateUserInfo = `
    UPDATE users 
    SET username = COALESCE($1, username), 
    email = COALESCE($2, email), 
    password = COALESCE($3, password), 
    profile_img = COALESCE($4, profile_img) 
    WHERE id = $5
`;
const deleteUserById = 'DELETE FROM users WHERE id = $1';
const deleteUserByName = 'DELETE FROM users WHERE username = $1';
const deleteUserByEmail = 'DELETE FROM users WHERE email = $1';
const getPasswordByEmail = 'SELECT password FROM users WHERE email = $1';

const getAllUsersWithFollows = `
SELECT
    u.id,
    u.username,
    u.profile_img,
    EXISTS (
        SELECT 1
        FROM follows f
        WHERE f.followed_user_id = $1 AND f.following_user_id = u.id
    ) AS isfollowing
FROM users u
WHERE u.id != $1;
`;

module.exports = {
    getUserByName,
    getUsers,
    getUserById,
    getUserByEmail,
    checkEmailExists,
    checkNameExists,
    addNewUser,
    updateUserInfo,
    deleteUserById,
    deleteUserByName,
    deleteUserByEmail,
    getPasswordByEmail,
    getAllUsersWithFollows
}