const express = require('express');
const userRouter = express.Router();
const { addUserContoller, getUserContoller, getUserSafeDetails, insertBookToBookshelf, getAllUserBooksController } = require('../controllers/user');
const { hashPassword } = require('../db/utils/passwordEncryption');
const { validateToken } = require('../db/utils/token');

const getAllUser = (req, res) => {

};

const getUser = (req, res) => {
    return getUserContoller(req.params.id).then((response) => res.json(response));
};

const getUserDetails = (req, res) => {
    return getUserSafeDetails(req).then((response) => res.status(200).json(response));
};

const addUser = async (req, res) => {
    const user = req.body;
    const { salt, password } = await hashPassword(user);
    user.salt = salt;
    user.password = password;

    addUserContoller(user)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(e => res.status(500));
};

const removeUser = (req, res) => {

};
const updateUser = (req, res) => {

};

const addUserBookToBookshelf = (req, res) => {
    // const { userId, book } = req;
    console.log(req.body);
    const { book, userId } = req.body;
    console.log(book);
    console.log(userId);
    insertBookToBookshelf(book, userId)
        .then(data => console.log(data))
        .catch(error => console.log(error));
};

const getAllUserBooks = (req, res) => {
    getAllUserBooksController(req.params.userId)
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        })
        .then(result => res.send(result.rows[0].bookdata));
};

//localhost:3010/user
userRouter.get('/', getAllUser);
userRouter.get('/details', validateToken, getUserDetails);
userRouter.get('/:id', validateToken, getUser);
userRouter.post('/', addUser);
userRouter.put('/books', addUserBookToBookshelf);
userRouter.get('/books/:userId', getAllUserBooks);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', removeUser);

module.exports = userRouter;