const bcrypt = require('bcryptjs');
const queries = require('../queries/user-queries');
const { pool }= require('../config');

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const getAllUsersWithFollows = (req, res) => {
    const { id } = req.query;

    pool.query(queries.getAllUsersWithFollows, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
}

const getUserById = (req, res) => {
    const id = req.params.id;

    pool.query(queries.getUserById, [id], (error, result) => {
        if (error) throw error;
        if (!result.rows.length) {
            return res.status(404).send('This user does not exist.');
        }
        res.status(200).json(result.rows);
    })
}

const getUserByName = (req, res) => {
    const username = req.params.username;
 
        pool.query(queries.getUserByName, [username], (error, result) => {
            if (error) throw error;
            if (!result.rows.length) {
               return res.status(404).send('This user does not exist.');
            }
            res.status(200).json(result.rows);
        });
}

const getUserByEmail = (req, res) => {
    const email = req.params.email;

    pool.query(queries.getUserByEmail, [email], (error, result) => {
        if (error) throw error;
        if (!result.rows.length) {
            return res.status(404).send('This user does not exist.');
        }
        res.status(200).json(result.rows);
    });
}

const createNewUser = async (req, res) => { 
    const { username, email, password, profile_img } = req.body;
    const hashedPSW = await bcrypt.hash(password, 12);
    
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if(results.rows.length) {
            res.status(403).json({ isSuccess: false, message:"This email exists."});
            return;
        }
        
        pool.query(queries.checkNameExists, [username], (error, results) => {
            if(results.rows.length) {
                res.status(403).json({ isSuccess: false, message:"This username exists."});
                return;
            }
            
            pool.query(queries.addNewUser, [username, email, hashedPSW, profile_img], (error, results) => {
                if(error) throw error;
                
                pool.query(queries.getUserByEmail, [email], (error, results) => {
                    if(error) throw error;
                    if(!results.rows.length) {
                        return res.status(404).json({ isLoggedIn: false, message: "Failed to create a session."});
                    }
                    const newUser = {
                        id: results.rows[0].id,
                        username: results.rows[0].username,
                        email: email ,
                        profile_img: results.rows[0].profile_img,
                        signup_date: results.rows[0]. signup_date,
                    }
                    req.session.user = newUser;
                    req.session.isAuth = true;
                    
                    res.status(201).json({ isSuccess: true, newUser });
                });
            });
        });
    });
}

const signInAccount = async (req, res) => {
    const { email, password } = req.body;

    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if(error) throw error;
        if (!results.rows.length) {
            res.status(404).json({ isLoggedIn: false, message: "This email does not exist."});
            return;
        }

        pool.query(queries.getPasswordByEmail, [email], async (error, results) => {
            if(error) throw error;
            const hashedPSW = results.rows[0].password;
            const isPSWCorrect = await bcrypt.compare(password, hashedPSW);
      
            if (isPSWCorrect) {
                pool.query(queries.getUserByEmail, [email], (error, results) => {
                    if(error) throw error;
                    req.session.user = { 
                        id: results.rows[0].id,
                        username: results.rows[0].username,
                        email: email ,
                        profile_img: results.rows[0].profile_img,
                        signup_date: results.rows[0]. signup_date,
                    }
                    req.session.isAuth = true;
                    res.status(201).json({ isLoggedIn: true, user: req.session.user });
                });
            } else {
                res.status(401).json({ isLoggedIn: false, message: "Password is incorrect."}); 
            }
        });
    });
}

const signOutAccount = (req, res) => {
    if(req.session) {
        req.session.destroy((error) => {
            if (error) throw error;
            res.status(200).json({ isLoggedOut: true });
        });
    }else {
        res.status(404).json({ isLoggedOut: false, message: "There is no session to destroy."});
    }
}

const updateUser = (req, res) => { 
    const id = req.params.id;
    const { username, email, password, profile_img } = req.body;
    let hashedPSW;
    if (password) {
        hashedPSW = bcrypt.hash(password);
    }

    pool.query(queries.getUserById, [id], (error, results) => {
        if(!results.rows.length) {
            return res.status(404).json({ isUpdated: false, message: "The user is not found."});
        }

        pool.query(queries.getUserByName, [username], (error, results) => {
            if(results.rows.length) {
                return res.status(409).json({ isUpdated: false, message: "This username is taken."});
            }

            pool.query(queries.updateUserInfo, [username, email, hashedPSW, profile_img, id],
                (error, results) => {
                    if(error) throw error;
                    req.session.user.username = username;
                    req.session.user.profile_img = profile_img;
                    res.status(201).json({ isUpdated: true }); 
                }
            );
        });
    });
}

const deleteUserByID = (req, res) => {
    const id = req.params.id;

    pool.query(queries.getUserById, [id], (error, results) => {
        if(!results.rows.length) {
            return res.status(404).json({ isDeleted: false, message: "The user does not exist."});
        }

        pool.query(queries.deleteUserById, [id], (error, results) => {
            if(error) throw error;
            if(req.session) {
                req.session.destroy();
            }
            res.status(200).json({ isDeleted: true});
        });
    });
}

const deleteUserByName = (req, res) => {
    const username = req.query.username;

    pool.query(queries.checkNameExists, [username], (error, results) => {
        if(!results.rows.length) {
            return res.status(404).json({ isDeleted: false, message: "The user does not exist."});
        }

        pool.query(queries.deleteUserByName, [username], (error, results) => {
            if(error) throw error;
            if(req.session) {
                req.session.destroy();
            }
            res.status(200).json({ isDeleted: true});
        });
    });
}

const deleteUserByEmail = (req, res) => {
    const email = req.query.email;

    pool.query(queries.getUserByEmail, [email], (error, results) => {
        if(!results.rows.length) {
            return res.status(404).json({ isDeleted: false, message: "The user does not exist."});
        }

        pool.query(queries.deleteUserByEmail, [email], (error, results) => {
            if(error) throw error;
            if(req.session) {
                req.session.destroy();
            }
            res.status(200).json({ isDeleted: true});
        });
    });
}

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.getUserByName = getUserByName;
exports.getUserByEmail = getUserByEmail;
exports.createNewUser = createNewUser;
exports.signInAccount = signInAccount;
exports.signOutAccount = signOutAccount;
exports.updateUser = updateUser;
exports.deleteUserByID = deleteUserByID;
exports.deleteUserByName = deleteUserByName;
exports.deleteUserByEmail = deleteUserByEmail;
exports.getAllUsersWithFollows = getAllUsersWithFollows;