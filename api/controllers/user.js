const { insertUser, getUserByMail, getUser, addToBookShelf, getAllUserBooks, deleteUserBook, removeFromBookShelf } = require('../db/models/userModel');
const { addBookToDB } = require('./book');
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
    console.log('book', book);
    const { bookId, title, imageUrl, authors, publishedYear } = book;
    const arrAuthors = authors.split(',');
    let intYear = publishedYear.split('-')[0];
    intYear = parseInt(intYear);
    const modelBook = { isbn: bookId, title, imageUrl, authors: arrAuthors, publishedYear: intYear };

    try {
        //todo -error- UnhandledPromiseRejectionWarning: error: column "publishedyear" of relation "books" does not exist
        // addBookToDB(modelBook).then(res => console.log(res))
    } catch (e) {
        console.log(e);
    }

    return addToBookShelf(book, userId);
};


const getAllUserBooksController = (userId) => {
    return getAllUserBooks(userId);
};

const deleteUserBookController = (booksToStay, userId) => {

    return removeFromBookShelf(booksToStay, userId);
};

const matchMatesController=async(id)=>{
    const user = await getUser(id)
    console.log(user)
//TODO algorytm matchujący znajomych
    //pobierz użytkownika
    //pobierz po 200 losowych użytkowników z odległości do 50km,do100km,pow 100km
    //+10 pkt do 50km,+5pkt 50-100, +0 powyzej 100
    //+-5lat 10pkt,+-10lat 5pkt, pow 0pkt
    //sprawdź ile książek się powtarza w biblioteczne +1pkt za każdą
    //sprawdź dominującą kategorię książek użytkownika
    //do 5 książek z tej samej kategorii +5pkt,pow 10 +10pkt
}
module.exports = {
    matchMatesController,
    addUserController,
    getUserByMailController,
    getUserController,
    getUserSafeDetails,
    insertBookToBookshelf,
    getAllUserBooksController,
    deleteUserBookController
};
