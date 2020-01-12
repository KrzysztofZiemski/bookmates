const connection = require('../connection');
const tableName = 'users';

const insertUser = () => {
    const sql = `
        INSERT INTO ${tableName}
        VALUES (
            DEFAULT, 'test@testowy.te', 'olaola', 'olaniemakota', 'Imie', 'Nazwisko', 'Polska', 'Wawa', 
            '01-001', NULL, 'Testowa', '33', '123', POINT(52.4,24.4), ' Krowa'
    )
    `;
  return connection.query(sql);
};

const getUsers = ()=>{
    const sql = `
        SELECT * FROM ${tableName}
    `;


return connection.query(sql);
};



getUsers().then((res) =>console.log(res.rows));