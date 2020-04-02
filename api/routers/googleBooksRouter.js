const express = require('express');
const googleBooksRouter = express.Router();
const axios = require('axios');
const hash = require('object-hash');

const cleanData = (data) => {
    return data.items.map((book) => {
        if (!book.volumeInfo.hasOwnProperty('publishedDate')) {
            book.volumeInfo['publishedDate'] = '0000';
        }
        if (!book.volumeInfo.hasOwnProperty('imageLinks')) {
            book.volumeInfo['imageLinks'] = { thumbnail: 'http://vrephotels.com/images/NoImageFound.png' };
        }
        if (!book.volumeInfo.hasOwnProperty('authors')) {
            book.volumeInfo['authors'] = ['not found'];
        }
        if (!book.volumeInfo.hasOwnProperty('industryIdentifiers')) {
            book.volumeInfo['industryIdentifiers'] = [{ identifier: hash(book.volumeInfo.infoLink) }];
        }
        if (book.volumeInfo.industryIdentifiers[0].type === 'OTHER') {
            book.volumeInfo['industryIdentifiers'] = [{ identifier: hash(book.volumeInfo.infoLink) }];
        }

        return book.volumeInfo;
    });
};

const getGoogleBooks = (req, res) => {
    const book = req.params.googleBook;
    console.log(book);
    const link = encodeURI(`https://www.googleapis.com/books/v1/volumes?q=${book}&maxResults=20`);
    axios.get(link)
        .then(response => {
            if (response.status !== 200) throw new Error(response.status);
            res.json(cleanData(response.data));
        })
        .catch(e => {
            console.log('error', e);
            res.status(500).json(e);
        });
};


googleBooksRouter.get('/:googleBook', getGoogleBooks);


module.exports = googleBooksRouter;
