const express = require("express");
const authRouter = express.Router();
const { checkPassword } = require('../db/utils/passwordEncryption');
const { getUserByMailContoller, getUserContoller } = require('../controllers/user');
const { generateToken, validateToken } = require('../db/utils/token');

const login = async (req, res) => {
    const userData = req.body;

    const responseUser = await getUserByMailContoller(userData);
    if (responseUser.length === 0) res.status(404).json('sprawdź login lub hasło');
    const user = responseUser[0];
    const isOk = checkPassword(user, userData.password);
    if (!isOk) res.status(404).json('sprawdź login lub hasło');
    const token = generateToken(user)
    const data = {
        id: user.id,
        mail: user.email,
        name: user.name,
        surname: user.surname,
        country: user.country,
        city: user.city,
        postal_code: user.postal_code,
        region: user.region,
        street_name: user.street_name,
        street_number: user.street_number,
        local_number: user.local_number,
        coords: user.coordinates,
        gender: user.gender,
        birth: user.birth,
        token: token
    }
    res.status(200).json(data);
}

const checkToken = (req, res) => {


    getUserContoller(req.token.sub).
        then(userList => {
            const user = userList[0];
            const data = {
                id: user.id,
                mail: user.email,
                name: user.name,
                surname: user.surname,
                country: user.country,
                city: user.city,
                postal_code: user.postal_code,
                region: user.region,
                street_name: user.street_name,
                street_number: user.street_number,
                local_number: user.local_number,
                coords: user.coordinates,
                gender: user.gender,
                birth: user.birth,
            }
            res.status(200).json(data)
        })
}

//localhost:3010/auth

//logowanie i zwracanie Bearer tokena przy poprawnym logowaniu
authRouter.post('/', login);

//sprawdzanie poprawności Bearer tokena(token wysyłamy w headersach )
authRouter.get('/token', validateToken, checkToken);

module.exports = authRouter;