const { insertUser, getUserByMail, getUser, addToBookShelf, updateUserDetails, removeUser } = require('../db/models/userModel');

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

const changeUserPasswordController = (userId, userPasswords) => {
    //walidacja starego hasła
    //jeśli jest ok, to dla nowego hasła wygenerować hash i salt i skorzystać z userModel żeby wypchnąć do db

}

const updateUserDetailsController = (userId, userDetails) => {
    updateUserDetails(userId, userDetails);
}

const removeUserController = (userId) => {
    let isRemoved = false;
    removeUser(userId)
        .then(response => {
            response.rowCount === 1 ? isRemoved = true : isRemoved = false
        });
    return isRemoved;
}

module.exports = { 
    addUserContoller, 
    getUserByMailContoller, 
    getUserContoller, 
    getUserSafeDetails, 
    insertBookToBookshelf,
    changeUserPasswordController,
    updateUserDetailsController,
    removeUserController
};