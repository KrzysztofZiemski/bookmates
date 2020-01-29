const express = require("express");
const userRouter = express.Router();
const { addUserContoller } = require('../controllers/user')
const { hashPassword } = require('../db/utils/passwordEncryption')

const getAllUser = (req, res) => {

}
const getUser = (req, res) => {

}

const addUser = async (req, res) => {
    const user = req.body;
    const { salt, password } = await hashPassword(user);
    user.salt = salt;
    user.password = password;
    addUserContoller(user)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(e => res.status(500))
}

const removeUser = (req, res) => {

}
const updateUser = (req, res) => {

}


//localhost:3010/user
userRouter.get('/', getAllUser)
userRouter.get('/:id', getUser)
userRouter.post('/', addUser)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', removeUser)







module.exports = userRouter;
