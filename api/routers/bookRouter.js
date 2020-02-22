const express = require("express");
const bookRouter = express.Router();
const { addBookToDB } = require('../controllers/book');



//localhost:3010/book
bookRouter.get('/', (req, res) => console.log('book'));

bookRouter.post('/', (req,res) => {
    const book = {
        isbn: 123456,
        title: 'sdasd',
        authors: ['John Doe', 'SDd dsd'],
        publishedYear: 1999
    }
    //const book = req.body;
    addBookToDB(book)
        .catch(err => {
            console.log(err);
            res.status(400).send(err)
        })
        .then(result => res.send(result));

})

module.exports = bookRouter;