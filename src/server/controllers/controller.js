//const db = require('../database')
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'enseniasbd'
});


function checkWordSpaces(req,res){
    var data = req.body.frase;
    query(data).then(result => {
        // implement your success case...
    }).catch(err => {
        //throw exception here...
    });

    function query(data){
        let consulta;
        return new Promise((resolve, reject) => {
            consulta = `SELECT * FROM WordWithSpaces`;
            connection.query(consulta, function (error, results, fields) {
                result = JSON.parse(JSON.stringify(results));
                let dataJoined = data.join(' ');
                result.forEach(function(element) {
                    if(dataJoined.includes(element.nombre) == true){
                        console.log(element.nombre);
                        console.log('----')
                    }
                });
                if (error) reject(error); //terminate the promisse...
            });
        });
    }
}

function querysignsArray(req,res,signsArray){
    let consulta;
    let response;
    signsArray.forEach(function(element){
        consulta = `SELECT link FROM imagen WHERE nombre = ${element}`;
        connection.query(consulta,function(error,results){
            result = JSON.parse(JSON.stringify(results));
            response.push(result);
        })
    })

}

module.exports = {
    checkWordSpaces,
    querysignsArray
}