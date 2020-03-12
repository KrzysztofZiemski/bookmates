const _ = require('lodash');
const { insertUser, getUserByMail, getUser, addToBookShelf, getAllUserBooks, deleteUserBook, removeFromBookShelf ,getByCoords} = require('../db/models/userModel');
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
const _mergeDuplicates=(input)=> {
    const output = [];
    let existingItem = null;
    input.forEach(function (inputItem) {
       existingItem = _.find(output, function (outputItem) {
            return inputItem.id === outputItem.id;
        });
        existingItem ? existingItem.count += 1 : output.push(inputItem);

        existingItem = null;
    });
    return output;
};
const _addPoints=(users, point)=>{
    return users.map(user=>{
        if(!user.hasOwnProperty('points')) user.points=0;
        user.points += point;
        return user
    });
}
const ageDiff = (birth1,birth2)=>{
   const birthYear1 = parseInt(birth1.split('-')[0]);
    const birthYear2 = parseInt(birth2.split('-')[0]);
    return birthYear1>birthYear2 ? birthYear1-birthYear2 : birthYear2-birthYear1;
}
const matchMatesController=async(id)=>{
    const user= await getUser(id).then(user=>user[0]);
    const user50 = await getByCoords(user.coordinates.x,user.coordinates.y,50).then(users=>_addPoints(users,10));
    const user100 = await getByCoords(user.coordinates.x,user.coordinates.y,100).then(users=>_addPoints(users,5));
    const user500 = await getByCoords(user.coordinates.x,user.coordinates.y,500).then(users=>_addPoints(users,0));
    let users = _mergeDuplicates([...user50, ...user100, ...user500]);
    users.forEach(propablyMate=>{
        const ageDifference = ageDiff(propablyMate.birth, user.birth);
        if(ageDifference<=5) return _addPoints([propablyMate],10);
        if(ageDifference<=10) return _addPoints([propablyMate],5);
        if(ageDifference<=5) return propablyMate;
    })

//TODO algorytm matchujący znajomych
    //pobierz użytkownika - check
    //pobierz po 200 losowych użytkowników z odległości do 50km,do100km,pow 100km - check
    //+10 pkt do 50km,+5pkt 50-100, +0 powyzej 100 - check
    //+-5lat 10pkt,+-10lat 5pkt, pow 0pkt - check
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
