const { Client } = require('pg');
const config = require('../config.json');

const client = new Client(config.DB);

client.connect();

module.exports = client;

client.query('SELECT NOW()', (err, res) => {
  console.log('db connected');
});
