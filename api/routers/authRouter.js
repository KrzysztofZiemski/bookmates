const express = require("express");
const authRouter = express.Router();

const auth = (req, res) => {
    console.log(req.body)
}
//localhost:3010/auth
authRouter.post('/', auth)

module.exports = authRouter;