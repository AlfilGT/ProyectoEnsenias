var express = require('express');
var path = require('path')
var app = express();
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var cors = require('cors');
var controller = require('./controllers/controller');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'enseniasbd'
});

connection.connect();

app.use(cors())

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.post('/consulta',controller.checkWordSpaces);


app.listen(3001,function(){
    console.log('Servidor escuchando en el puerto 3001');
})