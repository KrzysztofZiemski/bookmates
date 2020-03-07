const { insertUser, getUserByMail, getUser, addToBookShelf, getAllUserBooks, deleteUserBook } = require('../db/models/userModel');
const { addBookToDB } = require('./book')
const addUserController = (user) => {
    return insertUser(user);
};

const getUserByMailController = (userData) => {
    return getUserByMail(userData.mail);
};

const getUserController = (id) => {
    return getUser(id);
};

const getUserSafeDetails = (req) => {
    let userId = req.token.sub;
    return getUserController(userId)
        .then((userList) => {
            const user = userList[0];
            const { password_salt, password_hash, ...safeUserData } = user;
            return safeUserData;
        });
};

const insertBookToBookshelf = (book, userId) => {
    //todo
    console.log('book', book)
    const { bookId, title, imageUrl, authors, publishedYear } = book;
    const arrAuthors = authors.split(',');
    let intYear = publishedYear.split('-')[0];
    intYear = parseInt(intYear);
    const modelBook = { isbn: bookId, title, imageUrl, authors: arrAuthors, publishedYear: intYear }

    try {
        //todo -error- UnhandledPromiseRejectionWarning: error: column "publishedyear" of relation "books" does not exist
        // addBookToDB(modelBook).then(res => console.log(res))
    } catch (e) {
        console.log(e)
    }

    return addToBookShelf(book, userId);
};

const getAllUserBooksController = (userId) => {
    return getAllUserBooks(userId);
};

const deleteUserBookController = (userId, bookId) => {
    getUser(userId)
        .then(userArr => {
            const [user] = userArr;
            const bookIndex = user.books.findIndex((book) => book.bookId === bookId);
            user.books.splice(bookIndex, 1);

        })

    return deleteUserBook(userId, bookId);
};

module.exports = {
    addUserController,
    getUserByMailController,
    getUserController,
    getUserSafeDetails,
    insertBookToBookshelf,
    getAllUserBooksController,
    deleteUserBookController
};