const express = require('express');
const routers = express.Router();

const userRouter = require('./userRouter');
const bookRouter = require('./bookRouter');
const authRouter = require('./authRouter');

routers.use('/user', userRouter)
routers.use('/book', bookRouter)
routers.use('/auth', authRouter)
//...

module.exports = routers;