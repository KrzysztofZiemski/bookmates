const express = require('express');
const bookRouter = express.Router();
const { addBookToDB, getAllBooksFromDB, getBookFromDB, updateBookMetaDataController, getAllBookUserMetadataController, removeUserMetadataController } = require('../controllers/book');

const getAllBooks = (req, res) => {
    getAllBooksFromDB()
        .catch(err => {
            res.status(400).send(err);
        })
        .then(result => res.send(result));
};

const addBook = (req, res) => {
    const book = req.body;
    addBookToDB(book)
        .then(result => res.status(200).json(result))
        .catch(err => {
            res.status(400).send(err);
        });
};

const getSingleBook = (req, res) => {
    const book = req.params.id;
    getBookFromDB(book)
        .catch(err => {
            res.status(400).send(err);
        })
        .then(result => res.send(result));
};

const updateBookMetadata = async (req, res) => {
    const metaData = req.body;
    const bookId = req.params.bookId;

    try {
        let currentUserMetadata = await getAllBookUserMetadataController(bookId);
        let metaDataArr = currentUserMetadata[0].userbookmetadata || [];
        const indexOfMetadata = metaDataArr.map(b => b.userId).indexOf(metaData.userId);
        if (indexOfMetadata === -1) {
            await updateBookMetaDataController(bookId, metaData);
            return res.status(200).json(metaDataArr);
        } else {
            const allMetadata = await getAllBookUserMetadataController(bookId);
            const metadataToStay = allMetadata.slice(indexOfMetadata, 1);
            const updatedMeta = [...metaData, metadataToStay];
            await removeUserMetadataController(updatedMeta, bookId);
            return res.status(200).json(updatedMeta);
        }
    } catch (err) {
        return res.status(400).json(err);
    }
};

const deleteUserMetadata = async (req, res) => {
    const { userId, bookId } = req.params;
    try {
        let currentUserMetadata = await getAllBookUserMetadataController(bookId);
        let metadataArr = currentUserMetadata[0].userbookmetadata || [];
        let metadataToStay = metadataArr.filter(b => b.userId !== userId);
        await removeUserMetadataController(metadataToStay, bookId);
        let newMetadataArray = await getAllBookUserMetadataController(bookId) || [];
        return res.status(200).json(newMetadataArray);
    } catch (err) {
        return res.status(400).json(err);
    }
};

const getAllBookUserMetadata = (req, res) => {
    getAllBookUserMetadataController(req.params.bookId)
        .catch(err => {
            res.status(400).send(err);
        })
        .then(result => {
            if (result.length > 0) return res.json(result[0].userbookmetadata || []);
            res.json([]);
        });
};

//localhost:3010/book
bookRouter.delete('/:bookId/metadata/:userId', deleteUserMetadata);
bookRouter.get('/', getAllBooks);
bookRouter.post('/', addBook);
bookRouter.put('/:bookId/metadata', updateBookMetadata);
bookRouter.get('/:bookId/metadata', getAllBookUserMetadata);
bookRouter.get('/:id', getSingleBook);

module.exports = bookRouter;
