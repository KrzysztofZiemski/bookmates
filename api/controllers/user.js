const { insertUser, getUserByMail, getUser } = require('../db/models/userModel');


const addUserContoller = (user) => {
    return insertUser(user)
}
const getUserByMailContoller = (userData) => {
    return getUserByMail(userData.mail)
}
const getUserContoller = (id) => {
    return getUser(id)
}
module.exports = { addUserContoller, getUserByMailContoller, getUserContoller };