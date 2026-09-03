const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');

// Endpoints para /api/productos
router.post('/', productoController.crearProducto);
router.get('/', productoController.obtenerProductos);
router.get('/:id', productoController.obtenerProductoPorId);
router.put('/:id', productoController.actualizarPrecioStock);
router.delete('/:id', productoController.borradoLogico);

module.exports = router;
