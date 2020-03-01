const { insertBook, getBook, getAllBooks, getUserBooks } = require('../db/models/bookModel');

const addBookToDB = (book) => {
    return insertBook(book);
};

const getAllBooksFromDB = () => {
    return getAllBooks();
};

const getUserBooksFromDB = (user) => {
    return getUserBooks(user);
};


module.exports = { addBookToDB, getAllBooksFromDB, getUserBooksFromDB };