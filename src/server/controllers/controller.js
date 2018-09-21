//const db = require('../database')
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'enseniasbd'
});


function checkWordSpaces(req,res,next){
    var data = req.body.frase;
    query(data).then(result => {
        // implement your success case...
        res.locals.signsArray = result;// Enviar datos a la funcion siguiente en la ruta
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

function querysignsArray(req,res,next){
    let consulta;
    let signsArray = res.locals.signsArray; // Recibo los datos de la funcion anterior
    let response = []; // Array para guardar la respuesta total
    signsArray.forEach(function(element){ // Recorro el array de las palabras
        consulta = `SELECT link FROM imagen WHERE nombre = '${element}'`; // Hago la consulta
        connection.query(consulta,function(error,result,fields){ // Ejecuto la consulta
            result = JSON.parse(JSON.stringify(result)); // Traigo las respuestas
            response.push(result[0].link); // Las meto en un array todas las respuestas
        })
        console.log(response) // Aqui no lo muestra porque esta verga es asincrona
        setTimeout(function(){
            console.log(response) // Aqui si lo muestra porque le puse tiempo xd
        },3000)

    })
    

}

module.exports = {
    checkWordSpaces,
    querysignsArray
}