const { Schema , model } = require('mongoose');

const usuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        require: true,
        uniqued: true
    },

    pass: {
        type: String,
        required: true,
    }
})

module.exports = model('Usuario' , usuarioSchema );