const { Client } = require('pg');
const config = require('../config.json');

const client = new Client(config.DB);

client.connect();

module.exports = client;

// TODO: 'SELECT NOW()' is not returning error, even if there is no connection to db
client.query('SELECT NOW()', (err, res) => {
  console.log('db connected');
});