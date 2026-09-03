require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

app.use(express.json());

// Routes will be imported here
// const exampleRoutes = require('./routes/example.routes');
// app.use('/api/example', exampleRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
