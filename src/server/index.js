var express = require('express');
var path = require('path')
var app = express();

app.use(express.static(path.resolve(__dirname, '../../build')));

app.get('/consulta',(req,res)=>{
    res.status(200).send('hola')
})

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname + '/index.html'))
})


app.listen(3000,function(){
    console.log('Servidor escuchando en el puerto 3000');
})