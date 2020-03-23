const Productos = require('../models/Producto');

const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, __dirname+'../../uploads/');
        },
        filename : (req, file, next) => {
            const extension = file.mimetype.split('/')[1];
            next(null, `${shortid.generate()}.${extension}`);
        }
    }), 
    fileFilter(req, file, next) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            //el formato es valido
            next(null, true);
        } else {
            // el formato no es valido
            next(new Error('Formato no válido'), false);
        }
    }
}

//pasar la configuracion y el campo
const upload = multer(configuracionMulter).single('imagen')

//Sube un archivo
exports.subirArchivo = (req,res,next) => {
    upload(req,res,function(error){
        if(error){
            res.json({mensaje: error})
        }
        return next();
    })
}

//Agrega un nuevo producto
exports.nuevoProducto = async (req,res,next) => {
    const producto = new Productos(req.body)
    try {
        if(req.file.filename){
            producto.imagen = req.file.filename
        }
        await producto.save()
        res.json({mensaje: 'Producto Creado correctamente'})
    } catch (error) {
        console.log(error);
        next()
    }
}

//Muestra todos los Productos
exports.mostrarProductos = async (req,res,next) => {
    try {
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next()
    }
}

//Muestra un producto por un ID especifico
exports.mostrarProducto = async (req,res,next) => {
    const producto = await Productos.findById(req.params.idProducto);

    if(!producto){
        res.json({mensaje: 'Producto no existe'});
        return next()
    }
    res.json(producto);
}

//Actualizar un Producto
exports.actualizarProducto = async (req,res,next) => {
    try {
        const nuevoProducto= req.body;

        //verificar si hay una imagen nueva
        if(req.file){
            nuevoProducto.imagen = req.file.filename
        }else{
            const productoAnterior = await Productos.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen
        }

        const producto = await Productos.findOneAndUpdate({_id:req.params.idProducto},nuevoProducto,{
            new: true
        });
        res.json(producto)
    } catch (error) {
        console.log(error);
        next()
    }
}

//Eliminar un Producto
exports.eliminarProducto = async (req,res,next) => {
    try {
        await Productos.findOneAndDelete({_id:req.params.idProducto});
        res.json({mensaje:'Se elimino el producto correctamente'});
    } catch (error) {
        console.log(error);
        next()
    }
}

//buscar un producto
exports.buscarProducto = async (req,res,next) => {
    try {
        //obtener el query que viene del cliente
        const {query} = req.params
        const producto = await Productos.find({nombre: new RegExp(query,'i')});
        res.json(producto);
    } catch (error) {
        console.log(error);
        next()
    }
}