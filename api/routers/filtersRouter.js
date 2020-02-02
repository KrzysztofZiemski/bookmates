const express = require("express");
const filtersRouter = express.Router();
const axios = require('axios');
const Config = require('../config.json');

const autocompleteGoogle = (req, res) => {
    const city = req.params.city
    const link = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&key=${Config.ApiKeyMaps}&language=pl`;
    axios.get(link)
        .then(response => {
            if (response.status !== 200) throw new Error(response.status)
            res.json(response.data.predictions)
        })
        .catch(e => {
            console.log('error', e)
            res.status(500).json(e)
        })
}

// /filters
filtersRouter.get('/:city', autocompleteGoogle);


module.exports = filtersRouter;