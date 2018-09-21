const express = require('express');
let controller = require('../controllers/controller');
const api = express.Router()

api.post('/consulta',controller.checkWordSpaces,controller.querysignsArray);



module.exports = api
