const { insertUser, getUserByMail, getUser, addToBookShelf } = require('../db/models/userModel');

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
    let userId = req.token.sub;
    return getUserContoller(userId)
        .then((userList) => {
            const user = userList[0];
            const { password_salt, password_hash, ...safeUserData } = user;
            return safeUserData;
        })
};

const insertBookToBookshelf = (book, userId) => {
    addToBookShelf(book, userId)
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

module.exports = { addUserContoller, getUserByMailContoller, getUserContoller, getUserSafeDetails, insertBookToBookshelf };