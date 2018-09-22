//const db = require('../database')
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'enseniasbd'
});
var mysql2 = require('promise-mysql');
pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'enseniasbd',
    connectionLimit: 10
});


function checkWordSpaces(req, res, next) {
    var data = req.body.frase;
    query(data).then(result => {
        // implement your success case...
        res.locals.signsArray = result; // Enviar datos a la funcion siguiente en la ruta
        next(); // Funcion siguiente en la ruta
    }).catch(err => {
        //throw exception here...
    });

    function query(data) {
        let consulta;
        // --> PARA BUSCAR PALABRAS QUE CONTENGAN ESPACIOS <--
        return new Promise((resolve, reject) => {
            consulta = `SELECT * FROM WordWithSpaces`; // Devuelve todas las palabras con espacios usando la vista sql
            connection.query(consulta, function (error, results, fields) {
                result = JSON.parse(JSON.stringify(results)); // Convertir consulta en json
                let dataJoined = data.join(' '); // Convierte arreglo en un string, (Cada posicion es separada por un espacio)
                result.forEach(function (element) {
                    if (dataJoined.includes(element.nombre) == true) { // Si alguna palabra con espacio de la bd esta contenida en la frase enviada por annyang
                        ReplaceForSlash = element.nombre.toString().replace(new RegExp(" ", 'g'), '/') // Replamzar los espacios de la palabra encontrada por Slash
                        dataJoined = dataJoined.toString().replace(element.nombre, ReplaceForSlash) // Reemplazar los espacios la frase encontrada por slah (ej: adjetivo calificativo -> adjetivo/calificativo)
                    }
                });
                dataAux = dataJoined.split(' '); // Convertir vector toda la frase por espacios, ej: [el] [adjetivo/calificativo] [de] [una] [oracion]
                data = []
                dataAux.forEach(function (element) {
                    data.push(element.replace(new RegExp("/", 'g'), ' ')) // Quitar los slash del vector [el] [adjetivo calificativo] [de] ....
                })
                resolve(data);


                if (error) reject(error); //terminate the promisse...
            });
        });
    }
}

function querysignsArray(req, res, next) {
    let consulta;
    let signsArray = res.locals.signsArray; // Recibo los datos de la funcion anterior
    let response = []; // Array para guardar la respuesta total
    signsArray.forEach(function (element, index) { // Recorro el array de las palabras
        consulta = `SELECT link FROM imagen WHERE nombre = '${element}'`; // Hago la consulta
        pool.query(consulta).then(function (rows) {
            result = JSON.parse(JSON.stringify(rows));

            if (result[0] == undefined) { // Se debe deletrear
                let str = 'SELECT link FROM imagen WHERE'
                element.split("").forEach(function (element, index) {
                    str += ` nombre = '${element}' OR`
                });
                str = str.substring(0, str.length - 3);
                pool.query(str).then(function (rows) {
                    result = JSON.parse(JSON.stringify(rows));
                    console.log('DELETREO: ')
                    console.log(result)
                });
                console.log('deletreo encontro: ', element);
                console.log("consulta new: ", str)
            } else {
                response.push(result[0].link);
            }
        }).then(function () {
            if (index === signsArray.length - 1) {
                //console.log(response);
                res.send({
                    hello: 'world'
                });
                //res.json(JSON.stringify({ response: response }));
            }
        })

    })
}

module.exports = {
    checkWordSpaces,
    querysignsArray
}