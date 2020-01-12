const connection = require('../connection');
const tableName = 'users';

const userModel = (row) => ({
    id: row.id,
    email: row.email ,
    password_salt: row.password_salt ,
    passworh_hash : row.passworh_hash,
    name: row.name ,
    surname: row.surname ,
    country : row.country,
    city: row.city ,
    postal_code: row.city,
    region: row.region ,
    street_name: row.street_name ,
    street_number: row.street_number ,
    local_number: row.local_number ,
    coordinates: row.coordinates,
    gender : row.gender 


});

//userModel.update = (data) =>{
 //   console.log(data);
//};


const insertUser = () => { // w nawiasie userData  '${userData.email}'
    const sql = `
        INSERT INTO ${tableName}
        VALUES (
            DEFAULT, 'test@test', 'olaola', 'olaniemakota', 'Imie', 'Nazwisko', 'Polska', 'Wawa', 
            '01-001', NULL, 'Testowa', '33', '123', POINT(52.4,24.4), ' Krowa'
    )
    `;
  return connection.query(sql);
};

const getUsers = ()=>{
    const sql = `
        SELECT * FROM ${tableName}
    `;


return connection.query(sql).then((response) => response.rows.map(userModel));
};

const getUser = (id) =>{
    const sql = `
    SELECT * FROM ${tableName}
    WHERE id = ${id}    `;


return connection.query(sql).then((response) => response.rows.map(userModel));
};


module.exports = {getUsers, getUser};

//getUser(1).then((results) =>console.log(results[0]));