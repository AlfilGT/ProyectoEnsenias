var express = require('express');
var path = require('path')
var app = express();
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var cors = require('cors');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'enseniasbd'
});
connection.connect();

app.use(cors())
app.use(express.static(path.resolve(__dirname, '../../build')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/consulta',(req,res)=>{
    let data = req.body.frase;
    res.status(200).send(data);
    
    /*connection.query('SELECT count(*) from imagen', function (error, results, fields) {
        if (error) throw error;
        res.status(200).send(results[0])
    });*/
})

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname + '/index.html'))
})


app.listen(3001,function(){
    console.log('Servidor escuchando en el puerto 3001');
})