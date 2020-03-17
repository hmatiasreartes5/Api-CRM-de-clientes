const express = require('express');
const routes = require('./routes')

//Creando el servidor 
const app = express();

//Rutas de la app
app.use('/',routes())

//Puerto
app.listen(5000);