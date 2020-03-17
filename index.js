const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Creando el servidor 
const app = express();

//conectar a MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/apiCRMclientes',{
    useNewUrlParser: true
});

//habilitar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Rutas de la app
app.use('/',routes())

//Puerto
app.listen(5000);