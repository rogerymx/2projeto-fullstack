const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("Usuario");
const jwt = require("jsonwebtoken");
const SECRET = "segredojwt123";

async function verificaUser(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        // Verifica se o cabeçalho de autorização está presente
        if (!authHeader) {
            return res.status(401).json({ message: "Erro: Token não fornecido. Faça login." });
        }

        // O token normalmente vem no formato: "Bearer <token>"
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Erro: Token inválido. Faça login." });
        }

        // Verifica o token
        const decoded = jwt.verify(token, SECRET);

        // Busca o usuário no banco de dados
        const usuarioBuscado = await Usuario.findOne({ _id: decoded.userId });

        if (!usuarioBuscado) {
            return res.status(404).json({ message: "Erro: Usuário não encontrado. Faça login novamente." });
        }

        // Anexa o usuário ao objeto da requisição para uso futuro
        req.user = usuarioBuscado;

        // Prossegue para a próxima função no middleware
        next();
    } catch (erro) {
        console.error("Erro na autenticação:", erro.message);

        // Diferencia erros de token inválido e outros tipos de erros
        if (erro.name === "JsonWebTokenError") {
            return res.status(403).json({ message: "Erro: Token inválido. Faça login novamente." });
        }

        if (erro.name === "TokenExpiredError") {
            return res.status(403).json({ message: "Erro: Token expirado. Faça login novamente." });
        }

        return res.status(500).json({ message: "Erro interno no servidor." });
    }
}

module.exports = {
    verificaUser,
};
