const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Garante que não existam emails duplicados
        match: [/.+@.+\..+/, "Por favor, insira um email válido"]
    },
    senha: {
        type: String,
        required: true
    }
});

// Antes de salvar, criptografa a senha
UsuarioSchema.pre("save", async function (next) {
    if (!this.isModified("senha")) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
});

// Método para verificar a senha digitada com a hash salva no banco
UsuarioSchema.methods.verificarSenha = async function (senhaDigitada) {
    return await bcrypt.compare(senhaDigitada, this.senha);
};

module.exports = mongoose.model("Usuario", UsuarioSchema);
