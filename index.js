const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

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

//habilitar el cors para poder recibir consultas desde el cliente
app.use(cors())

//habilitar una carpeta publica //para poder visualizar las imaganes en el cliente
app.use(express.static('uploads'))

//Rutas de la app
app.use('/',routes())

//Puerto
app.listen(5000);