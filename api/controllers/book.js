const { insertBook, getBook, getAllBooks } = require('../db/models/bookModel');

const addBookToDB = (book) => {
    return insertBook(book);
};

const getAllBooksFromDB = () => {
    return getAllBooks();
}

module.exports = { addBookToDB, getAllBooksFromDB };