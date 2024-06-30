const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: String,
    password: String,
})

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = { Usuario };
