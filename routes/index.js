const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productoController');
const pedidoController = require('../controllers/pedidoController');

module.exports = function() {
    
    /** CLIENTES **/
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


    /** PRODCUTOS **/
    //Agrega un producto
    router.post('/productos',
    productoController.subirArchivo,
    productoController.nuevoProducto);

    //Muestra todos los productos
    router.get('/productos',productoController.mostrarProductos);

    //Muestra un producto especifico por su ID
    router.get('/productos/:idProducto',productoController.mostrarProducto);

    //Actualiza un producto
    router.put('/productos/:idProducto',
    productoController.subirArchivo,
    productoController.actualizarProducto);

    //Elimina un producto
    router.delete('/productos/:idProducto',productoController.eliminarProducto);

    //Buscar un producto por medio de una query
    router.post('/productos/busqueda/:query',productoController.buscarProducto)

    /** PEDIDOS **/
    //Agregar un pedido
    router.post('/pedidos/nuevo/:idUsuario',pedidoController.agregarPedido);

    //Mostrar todos los pedidos  
    router.get('/pedidos',pedidoController.mostrarPedidos);

    //Mostrar un pedido
    router.get('/pedidos/:idPedido',pedidoController.mostrarPedido);

    //Actualizar un pedido 
    router.put('/pedidos/:idPedido',pedidoController.actualizarPedido);

    //Eliminar un pedido
    router.delete('/pedidos/:idPedido',pedidoController.eliminarPedido);


    return router
}