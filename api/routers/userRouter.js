const express = require("express");
const userRouter = express.Router();
const bcrypt = require('bcryptjs');
const config = require('../config.json');


const getAllUser = (req, res) => {
    console.log('getAll users')
}
const getUser = (req, res) => {
    console.log('getUser users')
}
const addUser = async (req, res) => {
    const user = req.body;
    const salt = await bcrypt.genSaltSync(config.HASH_ROUND);
    user.salt = salt;
    user.password = await bcrypt.hashSync(user.password, salt);
    console.log(user)
}
const removeUser = (req, res) => {
    console.log('removeUser users')
}
const updateUser = (req, res) => {
    console.log('updateUser users')
}

//localhost:3010/user
userRouter.get('/', getAllUser)
userRouter.get('/:id', getUser)
userRouter.post('/', addUser)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', removeUser)







module.exports = userRouter;
