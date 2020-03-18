const Pedidos = require('../models/Pedido');

//Agregar un pedido 
exports.agregarPedido = async (req,res,next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({msg: 'Se agrego el pedido correctamente'});
    } catch (error) {
        console.log(error);
        next()
    }
}

//mostrar pedidos
exports.mostrarPedidos = async (req,res,next) => {
    try {
        const pedidos = await Pedidos.find().populate('cliente').populate({
            path:'pedido.producto',
            model:'Productos'
        });
        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next()
    }
}

//mostrar un pedido por su id
exports.mostrarPedido = async (req,res,next) =>{
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path: 'pedido.producto',
        model:'Productos'
    })

    if(!pedido){
        res.json({msg: 'No existe ese pedido'});
        return next()
    }

    res.json(pedido)
}

//Actualizar un pedido
exports.actualizarPedido = async (req,res,next) => {
    try {
        const pedido = await Pedidos.findByIdAndUpdate({_id:req.params.idPedido},req.body,{
            new:true
        }).populate('cliente').populate({
            path: 'pedido.producto',
            model:'Productos'
        })
        res.json(pedido)

    } catch (error) {
        console.log(error);
        next()
    }
}

//eliminar un pedido 
exports.eliminarPedido = async (req,res,next) => {
    try {
        await Pedidos.findByIdAndDelete({_id:req.params.idPedido});
        res.json({msg: 'Se elimino correctamente el pedido'})
    } catch (error) {
        console.log(error);
        next()
    }
}