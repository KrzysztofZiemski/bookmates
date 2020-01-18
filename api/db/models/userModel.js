const connection = require('../connection');
const tableName = 'users';
//dodać pole birth
const userModel = (row) => ({
    id: row.id,
    email: row.email,
    password_salt: row.password_salt,
    passworh_hash: row.passworh_hash,
    name: row.name,
    surname: row.surname,
    country: row.country,
    city: row.city,
    postal_code: row.city,
    region: row.region,
    street_name: row.street_name,
    street_number: row.street_number,
    local_number: row.local_number,
    coordinates: row.coordinates,
    gender: row.gender


});

//userModel.update = (data) =>{
//   console.log(data);
//};


const insertUser = (user) => { // w nawiasie userData  '${userData.email}'
    //dodać pole birth
    const sql = `
        INSERT INTO ${tableName}
        VALUES (
            DEFAULT, '${user.mail}', 'olaola', 'olaniemakota', '${user.name}', '${user.surname}', '${user.country}', '${user.city}', 
            '${user.postalCode}', NULL, 'Testowa', '33', '123', ${user.coords}, ' Krowa'
    )
    `;
    return connection.query(sql);
};

const getUsers = () => {
    const sql = `
        SELECT * FROM ${tableName}
    `;


    return connection.query(sql).then((response) => response.rows.map(userModel));
};

const getUser = (id) => {
    const sql = `
    SELECT * FROM ${tableName}
    WHERE id = ${id}    `;


    return connection.query(sql).then((response) => response.rows.map(userModel));
};
const getUserByLogin = (login) => {
    const sql = `
    SELECT * FROM ${tableName}
    WHERE login = ${login}    `;

    return connection.query(sql).then((response) => response.rows.map(userModel));
};

module.exports = { getUsers, getUser, getUserByLogin, insertUser };

//getUser(1).then((results) =>console.log(results[0]));