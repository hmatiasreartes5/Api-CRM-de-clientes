const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

module.exports = function() {
    
    //Agrega un nuevo Cliente 
    router.post('/clientes',clienteController.nuevoCliente)

    //muestra todos los clientes
    router.get('/clientes', clienteController.mostrarClientes); 
    
    //muestra un cliente por su id
    router.get('/clientes/:idCliente',clienteController.mostrarCliente);

    //actualiza un cliente 
    router.put('/clientes/:idCliente',clienteController.actualizarCliente);

    //eliminar un cliente
    router.delete('/clientes/:idCliente',clienteController.eliminarCliente);

    return router
}