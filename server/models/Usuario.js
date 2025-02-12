const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define o esquema do usuário
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    email: {
        type: String,
        required: [true, "O campo email é obrigatório"],
        unique: true, // Garante que não existam emails duplicados
        match: [/.+@.+\..+/, "Por favor, insira um email válido"], // Validação de formato de email
    },
    senha: {
        type: String,
        required: [true, "O campo senha é obrigatório"],
        minlength: [4, "A senha deve ter pelo menos 4 caracteres"], // Validação de tamanho mínimo
    },
});

// Método para verificar a senha digitada com a hash salva no banco
UsuarioSchema.methods.verificarSenha = async function (senhaDigitada) {
    return await bcrypt.compare(senhaDigitada, this.senha);
};

// Exporta o modelo de usuário
module.exports = mongoose.model("Usuario", UsuarioSchema);
