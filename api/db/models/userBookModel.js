const connection = require('../connection');

const tableName = 'user_books';

const insertBook = (book) => {
    const {
        userID,
        title,
        author,
        isbn,
        genre,
        rating,
        status
    } = book;
    const sql = `
        INSERT INTO ${tableName}
        VALUES(
           ${userID}, DEFAULT ,'${title}','${author}','${isbn}','${genre}',${rating},'${status}'
        )
    `;
    return connection.query(sql);
}

const getBook = (id) => {
    const sql = `
        SELECT * FROM ${tableName} WHERE user_book_id = ${id};
    `;
    return connection.query(sql).then(response => response.rows);
}

module.exports = {
    insertBook,
    getBook
};