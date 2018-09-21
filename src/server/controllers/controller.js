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
                result.forEach(function(element) {
                    let dataJoined = data.join(' ');
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

module.exports = {
    checkWordSpaces
}