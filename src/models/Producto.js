const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    codigoSKU: {
        type: String,
        required: [true, 'El código SKU es obligatorio'],
        unique: true,
        uppercase: true,
        trim: true,
        match: [/^[A-Z]{3}-\d{3}$/, 'El código SKU debe tener el formato de tres letras, un guion y tres números (Ej: TEC-001)']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser un número negativo (debe ser mayor o igual a 0)']
    },
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        default: 0,
        min: [0, 'El stock no puede ser un número negativo'],
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} debe ser un número entero'
        }
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        uppercase: true,
        trim: true,
        enum: {
            values: ['PERIFERICOS', 'MONITORES', 'COMPONENTES', 'ACCESORIOS'],
            message: '{VALUE} no es una categoría válida'
        }
    },
    estadoActivo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.models.Producto || mongoose.model('Producto', productoSchema);
