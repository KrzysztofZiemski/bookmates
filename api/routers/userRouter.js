const express = require('express');
const userRouter = express.Router();
const { addUserController, getUserController, getUserSafeDetails, insertBookToBookshelf, getAllUserBooksController, deleteUserBookController,matchMatesController } = require('../controllers/user');
const { hashPassword } = require('../db/utils/passwordEncryption');
const { validateToken } = require('../db/utils/token');
//TODO
const getAllUser = (req, res) => {

};

const getUser = (req, res) => {
    return getUserController(req.params.id).then((response) => res.json(response));
};

const getUserDetails = (req, res) => {
    return getUserSafeDetails(req).then((response) => res.status(200).json(response));
};

const addUser = async (req, res) => {
    const user = req.body;
    if (!user.name || !user.mail || !user.password || !user.coords) return res.status(400).json('not enought informations');
    const { salt, password } = await hashPassword(user);
    user.salt = salt;
    user.password = password;

    addUserController(user)
        .then(result => {
            return res.status(200).json(result);
        })
        .catch(e => res.status(500).json('invalid data'));
};
//TODO
const removeUser = (req, res) => {

};
//TODO
const updateUser = (req, res) => {

};

const addUserBookToBookshelf = async (req, res) => {
    const { book, userId } = req.body;

    try {
        let currentUserBooks = await getAllUserBooksController(userId);
        let bookArr = currentUserBooks.rows[0].bookdata || [];
        if (bookArr.map(b => b.bookId).indexOf(book.bookId) === -1) {
            let insertResult = await insertBookToBookshelf(book, userId);
            return res.status(200).json(insertResult);
        }
        throw new Error('book already exist in your library');
    } catch (err) {
        return res.status(400).json(err);
    }
};

const getAllUserBooks = (req, res) => {
    getAllUserBooksController(req.params.userId)
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        })
        .then(result => {
            res.json(result.rows[0].bookdata || []);
        });
};

const deleteUserBookFromBookShelf = async (req, res) => {
    const { userId, bookId } = req.params;

    try {
        let currentUserBooks = await getAllUserBooksController(userId);
        let bookArr = currentUserBooks.rows[0].bookdata || [];
        let booksToStay = bookArr.filter(b => b.bookId !== bookId);
        console.log(booksToStay);
        await deleteUserBookController(booksToStay, userId);
        let newBookArray = await currentUserBooks.rows[0].bookdata || [];
        return res.status(200).json(newBookArray);
    } catch (err) {
        return res.status(400).json(err);
    }
};
const matchMates=(req,res)=>{
    const id = req.body.id;
    matchMatesController(id);
}

//localhost:3010/user
userRouter.get('/', getAllUser);
userRouter.get('/details', validateToken, getUserDetails);
// userRouter.get('/match', validateToken, matchMates);
userRouter.get('/match', matchMates);
userRouter.get('/:id', validateToken, getUser);
userRouter.post('/', addUser);
userRouter.put('/books', addUserBookToBookshelf);
userRouter.get('/books/:userId', getAllUserBooks);
userRouter.delete('/books/:userId/:bookId', deleteUserBookFromBookShelf);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', removeUser);

module.exports = userRouter;
