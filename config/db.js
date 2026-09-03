const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nodegrupo04');
        console.log('MongoDB conectado exitosamente');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
