const connection = require('../connection');


const tableName = 'books';

const insertBook = (book) => {
    const { isbn, title, authors, publishedYear, imageUrl, description, category } = book;
    const sql = `INSERT INTO ${tableName} (id, isbn, title, authors, "publishedYear", imageurl, description, category) VALUES (
           DEFAULT, '${isbn}', '${title}', ARRAY [${authors.map(s => `'${s.trim()}'`)}], ${publishedYear}, '${imageUrl ? imageUrl : null}', '${description ? description : null}',  ARRAY [${category ? category.map(s => `'${s.trim()}'`) : []}]::varchar[]
        )
        RETURNING *
    `;

    return connection.query(sql);
};

const getBook = (id) => {
    const sql = `
        SELECT * FROM ${tableName} WHERE isbn = '${id}';
    `;
    return connection.query(sql).then(response => response.rows);
};

const getAllBooks = () => {
    const sql = `
        SELECT * FROM ${tableName};
    `;
    return connection.query(sql).then(response => response.rows);
};

const updateUserBookMetaDataDB = (bookId, metaData) => {

    const sql = `
        UPDATE ${tableName}
        SET userbookmetadata = (CASE
        WHEN userbookmetadata IS NULL THEN '[]'::jsonb
        ELSE userbookmetadata
    END
) ||  '${JSON.stringify(metaData)}'::jsonb
        WHERE id = ${bookId};
    `;
    return connection.query(sql).then(response => response.rows);
};


const removeFromUserMetadata = (metaData, bookId) => {
    const sql = `
    UPDATE ${tableName}
    SET userbookmetadata = '${JSON.stringify(metaData)}'::jsonb
    WHERE id = ${bookId}`;
    return connection.query(sql);
};

const getAllBookUserMetadata = (bookId) => {
    const sql = `SELECT userbookmetadata
  FROM ${tableName} WHERE id=${bookId}
    `;
    return connection.query(sql)
        .then(response => response.rows);
};

module.exports = {
    insertBook,
    getBook,
    getAllBooks,
    updateUserBookMetaDataDB,
    getAllBookUserMetadata,
    removeFromUserMetadata
};
