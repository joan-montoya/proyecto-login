const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let alertaSchema = new Schema ({
    //_id: {
     //   type: String,
     //   required: [true, 'El id es necesario']  
    //},
    local: {
        type: String,
        required: [true, 'El destino es neceario'],
        unique: true
    },
    descripcion:{
        type: String,
        required: [true, 'El inicio es necesario']
    },
    email:{
        type: String,
        required: [true, 'El email del conductor es necesario']
    },

},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});
module.exports = mongoose.model('Alerta', alertaSchema);