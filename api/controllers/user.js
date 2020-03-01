const { insertUser, getUserByName, getAllUsers, getUser, addToBookShelf } = require('../db/models/userModel');

const addUserController = (user) => {
    return insertUser(user)
}

const getUserByNameController = (userData) => {
    return getUserByName(userData.name)
}

const getUserController = (id) => {
    return getUser(id);
}

const getAllUsersController = () => {
    return getAllUsers();
};

const getUserSafeDetails = (req) => {
    let userId = req.token.sub;
    return getUserController(userId)
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

module.exports = { 
    addUserController, 
    getUserByNameController, 
    getUserController, 
    getAllUsersController, 
    getUserSafeDetails, 
    insertBookToBookshelf 
};