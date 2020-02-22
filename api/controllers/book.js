const { insertBook, getBook } = require('../db/models/bookModel');

const addBookToDB = (book) => {

    return insertBook(book);
};

module.exports = { addBookToDB };