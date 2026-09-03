const Proveedor = require('../models/Proveedor');

// 1. Crear un proveedor
exports.crearProveedor = async (req, res) => {
    try {
        const nuevoProveedor = new Proveedor(req.body);
        const proveedorGuardado = await nuevoProveedor.save();
        res.status(201).json(proveedorGuardado);
    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al crear el proveedor. Verifique los datos ingresados.',
            error: error.message
        });
    }
};

// 2. Obtener todos los proveedores
exports.obtenerProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.find();
        res.status(200).json(proveedores);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los proveedores',
            error: error.message
        });
    }
};

// 3. Obtener un proveedor por ID
exports.obtenerProveedorPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const proveedor = await Proveedor.findById(id);

        if (!proveedor) {
            return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
        }

        res.status(200).json(proveedor);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al buscar el proveedor',
            error: error.message
        });
    }
};
