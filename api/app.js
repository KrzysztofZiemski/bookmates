const express = require("express");
const app = express();
const cors = require('cors');
const routers = require('./routers');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(jsonParser)
app.use(cors());

app.use('/', routers);

const runServer = (port) => {
    console.log(`Server is running on port ${port}`);
    app.listen(port);
};

module.exports = { runServer };