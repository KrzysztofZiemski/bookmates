const { insertUser, getUserByMail, getUser } = require('../db/models/userModel');

const addUserContoller = (user) => {
    return insertUser(user)
}

const getUserByMailContoller = (userData) => {
    return getUserByMail(userData.mail)
}

const getUserContoller = (id) => {
    return getUser(id);
}

const getUserSafeDetails = (req) => {
    getUserContoller(req.token.sub)
        .then(userList => {
            const user = userList[0];
            const { password_salt, password_hash, ...safeUserData } = user;
            
            return safeUserData;
        })
}


module.exports = { addUserContoller, getUserByMailContoller, getUserContoller, getUserSafeDetails };