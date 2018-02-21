var express = require('express');
var app = express();
var path = require('path')

app.use(express.static(path.resolve(__dirname, '../../build')));


app.get('*',function(req,res){
    res.sendFile(path.resolve(__dirname + './index.html'))
})


app.listen(3000,function(){
    console.log('Servidor escuchando en el puerto 3000');
})
