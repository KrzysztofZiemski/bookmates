const connection=require('../connection');

const tableName = 'user_books';

const insertBook=(book)=>{
    const{ userID, title, author, isbn, genre, rating, status} = book;
    const sql =`
        INSERT INTO ${tableName}
        VALUES(
           ${userID}, DEFAULT ,${title},${author},${isbn},${genre},${rating}, ${status}
        )
    `;
    return connection.query(sql);
}

const getBook=()=>{
    const sql = `
        SELECT * FROM ${tableName}
    `;
    return connection.query(sql);
}