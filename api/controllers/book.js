const { insertBook, getBook, getAllBooks, updateUserBookMetaDataDB, getAllBookUserMetadata, removeFromUserMetadata } = require('../db/models/bookModel');

const addBookToDB = (book) => {
    return insertBook(book);
};

const getAllBooksFromDB = () => {
    return getAllBooks();
};

const getBookFromDB = id => {
    return getBook(id);
};

const updateBookMetaDataController = (bookId, metaData) => {
    return updateUserBookMetaDataDB(bookId, metaData);
};
const getAllBookUserMetadataController = (bookId) => {
    return getAllBookUserMetadata(bookId);
};

const removeUserMetadataController = (metaDataToStay, bookId) => {
    return removeFromUserMetadata(metaDataToStay, bookId);
};


module.exports = {
    addBookToDB,
    getAllBooksFromDB,
    getBookFromDB,
    updateBookMetaDataController,
    getAllBookUserMetadataController,
    removeUserMetadataController
};
