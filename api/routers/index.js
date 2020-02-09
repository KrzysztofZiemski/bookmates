const express = require('express');
const routers = express.Router();

const userRouter = require('./userRouter');
const bookRouter = require('./bookRouter');
const authRouter = require('./authRouter');
const filtersRouter = require('./filtersRouter');

routers.use('/user', userRouter)
routers.use('/book', bookRouter)
routers.use('/auth', authRouter)
routers.use('/filters', filtersRouter)
//...

module.exports = routers;