const mongoose = require ('mongoose');

let Schema = mongoose.Schema;

let conductorSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    apellidos: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email:{
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es necesaria']
    },
    curp: {
        type: String,
    },
    placa: {
        type: String,
        required: [true, 'La placa es Requerida']
    },
    marca: {
        type: String,
        required: [true, 'Marca del vehiculo requerida']
    },
    modelo: {
        type: String,
        required: [true, 'El modelo es requerido']
    },
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

module.exports = mongoose.model('Conductor', conductorSchema);