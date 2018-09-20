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

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.post('/consulta',(req,res)=>{
    var data = req.body.frase;
    let consulta;
    let respuesta = [];
    console.log('Esto va a data: ',data);
    query(data).then(result => {
       
        // implement your success case...

    }).catch(err => {
        //throw exception here...
    });

});

function query(data){
    console.log('QUeryyyyyyyy')

    return new Promise((resolve, reject) => {
        consulta = `SELECT * FROM WordWithSpaces`;
        connection.query(consulta, function (error, results, fields) {
            console.log('Resultado: ')
            result = JSON.parse(JSON.stringify(results));
            result.forEach(function(element) {
                let dataJoined = data.join(' ');
                if(dataJoined.includes(element.nombre) == true){
                    console.log(element.nombre);
                    console.log('----')
                }
              });
            if (error) reject(error); //terminate the promisse...
            if(results[0].length > 0){
                console.log('la consulta fue: ')
                console.log(results);
            }
        });

    });

}




app.listen(3001,function(){
    console.log('Servidor escuchando en el puerto 3001');
})