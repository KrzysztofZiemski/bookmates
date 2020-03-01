const express = require("express");
const bookRouter = express.Router();
const { addBookToDB, getAllBooksFromDB, getUserBooksFromDB } = require('../controllers/book');

const getAllBooks = (req, res) => {
    getAllBooksFromDB()
        .catch(err => {
            console.log(err);
            res.status(400).send(err)
        })
        .then(result => res.send(result));
};

const addBook = (req, res) => {
    const book = req.body;
    addBookToDB(book)
        .catch(err => {
            console.log(err);
            res.status(400).send(err)
        })
        .then(result => res.send(result));
}

const getSingleBook = () => {};



const getUserBooks = (req, res) => {
    getUserBooksFromDB(user)
        .catch(err => {
            console.log(err);
            res.status(400).send(err)
        })
        .then(result => res.send(result));
};

//localhost:3010/book
bookRouter.get('/', getAllBooks);
bookRouter.post('/', addBook);
bookRouter.get('/:id', getSingleBook);
bookRouter.get('/:id', getUserBooks);

module.exports = bookRouter;