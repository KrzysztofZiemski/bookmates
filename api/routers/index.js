const express = require('express');
const routers = express.Router();

const userRouter = require('./userRouter');
const bookRouter = require('./bookRouter');
const authRouter = require('./authRouter');
const filtersRouter = require('./filtersRouter');
const googleBooksRouter = require('./googleBooksRouter');


routers.use('/user', userRouter);
routers.use('/book', bookRouter);
routers.use('/auth', authRouter);
routers.use('/filters', filtersRouter);
routers.use('/filters', filtersRouter);
routers.use('/googleBooks', googleBooksRouter);


//...

module.exports = routers;