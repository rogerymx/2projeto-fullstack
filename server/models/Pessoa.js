const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pessoa = new Schema({
    nome: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

mongoose.model("pessoas", Pessoa);