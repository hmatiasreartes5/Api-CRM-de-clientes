const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

//Creando el servidor 
const app = express();

//conectar a MongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/apiCRMclientes',{
    useNewUrlParser: true
});

//Rutas de la app
app.use('/',routes())

//Puerto
app.listen(5000);