require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

app.use(express.json());

// Rutas
const productoRoutes = require('./src/routes/producto.routes');
const proveedorRoutes = require('./src/routes/proveedor.routes');
app.use('/api/productos', productoRoutes);
app.use('/api/proveedores', proveedorRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
