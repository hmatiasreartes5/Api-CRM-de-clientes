const Cliente = require('../models/Cliente');

//Agrega un nuevo cliente 
exports.nuevoCliente = async ( req,res,next) => {
    //console.log(req.body);

    const cliente = new Cliente(req.body);
    try {
        await cliente.save();
        res.json({mensaje: 'Se agrego un cliente correctamente'});
    } catch (error) {
        res.send(error);
        next() //se va al siguiente middleware evita que a la app se detenga
    }
}

//Mostrar los clientes 
exports.mostrarClientes = async (req,res,next) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes)
    } catch (error) {
        console.log(error);
        next()
    }
}

//Muestra un cliente en especifico por su ID
exports.mostrarCliente = async (req,res,next) => {
    console.log('Hola')
    const cliente = await Cliente.findById(req.params.idCliente);

    if(!cliente){
        res.json({mensaje: 'Ese cliente no existe'});
        next()
    }

    //Mostrar el cliente
    res.json(cliente)
}

//Actualizar un cliente
exports.actualizarCliente = async (req,res,next) => {
    try {
        const cliente = await Cliente.findOneAndUpdate({_id: req.params.idCliente},req.body,{
            new : true
        });
        res.json(cliente);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Eliminar un cliente
exports.eliminarCliente = async (req,res,next) => {
    try {
        await Cliente.findOneAndDelete({_id: req.params.idCliente});
        res.json({mensaje: 'Se elimino correctamente el cliente'})
    } catch (error) {
        console.log(error);
        next();
    }
}