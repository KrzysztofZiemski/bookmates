const connection = require('../connection');
const tableName = 'users';

const userModel = (row) => ({
    id: row.id,
    email: row.email,
    password_salt: row.password_salt,
    password_hash: row.password_hash,
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
    gender: row.gender,
    birth: row.birth

});

userModel.update = (data) => {
    console.log(data);
};

const insertUser = (user) => {

    const sql = `
        INSERT INTO ${tableName}
        VALUES (
            DEFAULT, '${user.mail}', '${user.salt}', '${user.password}', '${user.name}', '${user.country}', '${user.city}',
             POINT(${user.coords.lat}, ${user.coords.lng}), '${user.gender}','${user.birth}', DEFAULT
    )`;

    return connection.query(sql);
};

const addToBookShelf = (bookData, userId) => {
    console.log(bookData, userId)
    const sql = `
    UPDATE users
    SET bookdata = bookdata || '${JSON.stringify(bookData)}'::jsonb
    WHERE id = ${userId}`;
    return connection.query(sql);
};




const getUsers = (id) => {
    const sql = `
        SELECT * FROM ${tableName} WHERE id=${id}
    `;
    return connection.query(sql).then((response) => {
        console.log('weszło?')
        return response.rows.map(userModel)
    }).catch(err => console.log(err));
};

const getUser = (id) => {
    const sql = `
    SELECT * FROM ${tableName}
    WHERE id = ${id}    `;


    return connection.query(sql).then((response) => response.rows.map(userModel));
};
const getUserByMail = (mail) => {
    const sql = `
    SELECT * FROM ${tableName}
    WHERE email = '${mail}'`;
    return connection.query(sql).then((response) => response.rows.map(userModel));
};
const removeUser = (id) => {
    console.log('remove')
    const sql = `
        DELETE FROM ${tableName}
        WHERE id = ${id}
        `
    return connection.query(sql);
}

const insertBook = (book) => {
    const { userID, title, author, isbn, genre, rating, status } = book;
    const sql = `INSERT INTO ${tableName}VALUES(
           ${userID}, DEFAULT ,'${title}','${author}','${isbn}','${genre}',${rating},'${status}'
        )
    `;
    return connection.query(sql);
};
//getUserByMail('krzyszto').then(e => console.log(e))

module.exports = { insertUser, getUserByMail, getUser, insertBook, addToBookShelf };