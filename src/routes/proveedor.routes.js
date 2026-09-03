const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedor.controller');

// Rutas para /api/proveedores
router.post('/', proveedorController.crearProveedor);
router.get('/', proveedorController.obtenerProveedores);
router.get('/:id', proveedorController.obtenerProveedorPorId);

module.exports = router;
