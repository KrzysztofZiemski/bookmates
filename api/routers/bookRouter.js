const express = require("express");
const bookRouter = express.Router();


//localhost:3010/book
bookRouter.get('/', (req, res) => console.log('book'))

module.exports = bookRouter;