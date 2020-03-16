const { insertUser, getUserByMail, getUser, addToBookShelf, getAllUserBooks, deleteUserBook, removeFromBookShelf,getByCoordsBetween } = require('../db/models/userModel');
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
////algorytm matchujacy -
//pobierz użytkownika - check
//pobierz po 200 losowych użytkowników z odległości do 50km,do100km,pow 100km - check
//+10 pkt do 50km,+5pkt 50-100, +0 powyzej 100 - check
//+-5lat 10pkt,+-10lat 5pkt, pow 0pkt - check
//sprawdź ile książek się powtarza w biblioteczne +1pkt za każdą check
//sprawdź dominującą kategorię książek użytkownika
//do 5 książek z tej samej kategorii +5pkt,pow 10 +10pkt
const matchMatesController=async(id)=>{
        const user = await getUser(id).then(user => user[0]);
        const mates50 = await getByCoordsBetween(user.coordinates.x, user.coordinates.y, 0, 50)
            .then(users => users.map(user => {
                user.points = 10;
                return user
            }));
        const mates100 = await getByCoordsBetween(user.coordinates.x, user.coordinates.y, 50, 100)
            .then(users => users.map(user => {
                user.points = 5;
                return user
            }));
        const matesMoreThan100 = await getByCoordsBetween(user.coordinates.x, user.coordinates.y, 100, 1000000000)
            .then(users => users.map(user => {
                user.points = 0;
                return user
            }));
        let mates = [...mates50, ...mates100, ...matesMoreThan100];
        mates = mates.map(mate => _addPoints(mate, user))
            .sort((a, b) => a.points >= b.points)
            .slice(0, 20);
        return mates.map(mate => {
            return {
                id: mate.id,
                email: mate.email,
                name: mate.name,
                city: mate.city,
                books: mate.books,
            }
        })

};

const _addPointsByAge = (birth1,birth2)=>{
    const birthYear1 = parseInt(birth1.split('-')[0]);
    const birthYear2 = parseInt(birth2.split('-')[0]);
    const difference =  birthYear1 > birthYear2 ? birthYear1-birthYear2 : birthYear2-birthYear1;
    if(difference<=5) return 10;
    if(difference<10) return 5;
    return 0;
};

const _addPointsByBook = (userBooks,mateBooks)=>{
    if(mateBooks===null || userBooks===null) return 0;
    let points=0;
    userBooks.forEach(userBook=>{
        mateBooks.forEach(mateBook=>{
            if(userBook.bookId===mateBook.bookId || userBook.title===mateBook.title) return points+=1;
        })
    });
    return points;
};
const _getFavoriteCategory = (books)=>{
    const allCategories={};
        books.forEach(book=>{
        if(book.hasOwnProperty('categories')){
            book.categories.forEach(category=>{
                allCategories.hasOwnProperty(category)? allCategories[category]+=1: allCategories[category]=0;
            })
        }
    });
    let max={count:0, category:null};

   for(let category in allCategories){
       if(allCategories[category] >= max.count){
           max.count=allCategories[category];
           max.category=category;
       }
   }
  return max.category;
};

const _addPointsByCategory = (userBooks, mateBooks)=>{
    const userFavoriteCategory = _getFavoriteCategory(userBooks);
    let countBookByCategory=0;
    mateBooks.forEach(book=>{
        if(book.hasOwnProperty('categories')){
            book.categories.forEach(category=>{
                if(category===userFavoriteCategory) countBookByCategory++
            })
        }
    })
    if(countBookByCategory>=10) return 10;
    if(countBookByCategory>=5) return 5;
    return 0;
};

const _addPoints=(mate,user)=>{
    let birthPoints = _addPointsByAge(user.birth, mate.birth);
    let bookPoints = _addPointsByBook(user.books, mate.books);
    let categoryPoints = _addPointsByCategory(user.books, mate.books);
    mate.points +=birthPoints+bookPoints+categoryPoints;
    return mate;

};

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
