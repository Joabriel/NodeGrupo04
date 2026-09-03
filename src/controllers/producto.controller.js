const Producto = require('../models/Producto');

// 1. Crear un producto
exports.crearProducto = async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        const productoGuardado = await nuevoProducto.save();
        res.status(201).json(productoGuardado);
    } catch (error) {
        // Si el SKU no cumple el formato u otra validación falla, devuelve status 400
        res.status(400).json({
            mensaje: 'Error al crear el producto. Verifique los datos ingresados.',
            error: error.message
        });
    }
};

// 2. Obtener productos (con filtro opcional por categoría)
exports.obtenerProductos = async (req, res) => {
    try {
        const { categoria } = req.query;
        const filtro = {};

        // Si se envió la categoría en la query string, filtramos por ella
        if (categoria) {
            filtro.categoria = categoria.toUpperCase();
        }

        const productos = await Producto.find(filtro).populate('proveedor');
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los productos',
            error: error.message
        });
    }
};

// 3. Obtener un producto por ID
exports.obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id).populate('proveedor');

        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al buscar el producto',
            error: error.message
        });
    }
};

// 4. Actualizar precio, stock o datos del producto (PUT) con validaciones activadas
exports.actualizarPrecioStock = async (req, res) => {
    try {
        const { id } = req.params;

        // runValidators: true asegura que las validaciones de Mongoose sigan vigentes al actualizar
        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!productoActualizado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.status(200).json(productoActualizado);
    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al actualizar el producto. Verifique los datos ingresados.',
            error: error.message
        });
    }
};

// 5. Borrado lógico (Soft Delete - estadoActivo a false)
exports.borradoLogico = async (req, res) => {
    try {
        const { id } = req.params;

        const productoDesactivado = await Producto.findByIdAndUpdate(
            id,
            { estadoActivo: false },
            { new: true }
        );

        if (!productoDesactivado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.status(200).json({
            mensaje: 'Producto desactivado correctamente (borrado lógico)',
            producto: productoDesactivado
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al desactivar el producto',
            error: error.message
        });
    }
};
