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
    var data = req.body.frase;
    let consulta;
    let respuesta = [];
    // Si en la oracion, existen 2 palabras que corresponden una seña
    // Comparamos las palabras de 2 en 2
    for(let i=1;i<data.length;i++){
        consulta = `SELECT * FROM imagen WHERE nombre = "${data[i-1] +' '+ data[i]}"`;
        connection.query(consulta, function (error, results, fields) {
            if (error) throw error;

            if(results.length > 0){ // Si existe una seña que tenga 2 palabras
                data[i-1] = data[i-1] +" "+data[i]; // Unidos jamas seran vencidos
                data.splice(i, 1);
            }
        });
    }

})


app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname + '/index.html'))
})


app.listen(3001,function(){
    console.log('Servidor escuchando en el puerto 3001');
})