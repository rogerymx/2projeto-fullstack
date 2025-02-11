const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");
const jwt = require("jsonwebtoken");
const SECRET = "segredojwt123";

async function verificaUser(req,res,next) {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(404).json({message: "Erro, faça login"});
    }

    try {
        const decoded = await jwt.verify(token, SECRET);

        const usuarioBuscado = await Usuario.findOne({_id: decoded.userId});

        if(!usuarioBuscado) {
            return res.status(404).json({message: "Erro ao buscar usuario"});
        }

        req.user = usuarioBuscado;
        next();
    } catch(erro) {
        return res.status(403).json({message: "Erro, faça login novamente"});
    }
}

module.exports = {
    verificaUser
}