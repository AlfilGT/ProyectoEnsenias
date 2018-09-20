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

    query(data).then(result => {
        console.log(data);
        // implement your success case...

    }).catch(err => {
        //throw exception here...
    });

});

function query(data){

    return new Promise((resolve, reject) => {

        var counter = 0;

        if (data.length > 0){

            for(let i=1;i<data.length;i++){

                consulta = `SELECT * FROM imagen WHERE nombre = "${data[i-1] +' '+ data[i]}"`;

                connection.query(consulta, function (error, results, fields) {
                    if (error) reject(error); //terminate the promisse...

                    if(results.length > 0){ // Si existe una seña que tenga 2 palabras
                        data[i-1] = data[i-1] +" "+data[i]; // Unidos jamas seran vencidos
                        data.splice(i, 1);
                    }

                    counter++;

                    if (counter >= data.length){
                        resolve("Everything OK");
                    }

                });

            }

        } else {
            reject("There are no data"); //terminate the promise...
        }

    });

}




app.listen(3001,function(){
    console.log('Servidor escuchando en el puerto 3001');
})