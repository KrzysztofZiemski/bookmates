const { insertUser, getUserByName, getUser, addToBookShelf, getAllUserBooks } = require('../db/models/userModel');

const addUserController = (user) => {
    return insertUser(user);
};

const getUserByNameController = (userData) => {
    return getUserByName(userData.name);
};

const getUserController = (id) => {
    return getUser(id);
};

const getUserSafeDetails = (req) => {
    let userId = req.token.sub;
    return getUserController(userId)
        .then((userList) => {
            const user = userList[0];
            const { password_salt, password_hash, ...safeUserData } = user;
            return safeUserData;
        });
};

const insertBookToBookshelf = (book, userId) => {
    return addToBookShelf(book, userId);

};

const getAllUserBooksController = (userId) => {
    return getAllUserBooks(userId);
};

module.exports = {
    addUserController,
    getUserByNameController,
    getUserController,
    getUserSafeDetails,
    insertBookToBookshelf,
    getAllUserBooksController
};