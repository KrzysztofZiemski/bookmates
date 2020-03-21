const { insertBook, getBook, getAllBooks } = require('../db/models/bookModel');

const addBookToDB = (book) => {
    return insertBook(book);
};

const getAllBooksFromDB = () => {
    return getAllBooks();
};

const getBookFromDB = id => {
    return getBook(id);
};

module.exports = { addBookToDB, getAllBooksFromDB, getBookFromDB };
