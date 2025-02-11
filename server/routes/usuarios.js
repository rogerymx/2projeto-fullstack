const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("usuarios");
const bcryptjs = require("bcryptjs");
const SECRET = "segredojwt123";

//rota de criacao de usuario
router.post("/", async (req,res) => {
    if(!req.body.email || typeof req.body.email === undefined || req.body.email === null) {
        return res.status(400).json({message: "Erro, e-mail invalido"});
    }

    if(!req.body.senha || typeof req.body.senha === undefined || req.body.senha === null) {
        return res.status(400).json({message: "Erro, senha invalida"});
    }

    if(req.body.senha.length < 4) {
        return res.status(400).json({message: "Senha muito curta"});
    }

    try {
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(req.body.senha, salt);

        const novoUsuario = new Usuario({
            email: req.body.email,
            senha: hash
        });

        const usuarioSalvo = await novoUsuario.save();
        return res.status(201).json({message: "Conta criada com sucesso!!!", usuarioSalvo:usuarioSalvo});
    } catch(erro) {
        console.log("Erro interno no servidor, erro: "+erro);
    }
});

//rota de login
router.post("/login", async (req,res) => {
    if(!req.body.email || typeof req.body.email === undefined || req.body.email === null) {
        return res.status(400).json({message: "Erro, e-mail invalido"});
    }

    if(!req.body.senha || typeof req.body.senha === undefined || req.body.senha === null) {
        return res.status(400).json({message: "Erro, senha invalida"});
    }

    try {
        const usuarioBuscado = await Usuario.findOne({email: req.body.email});

        if(!usuarioBuscado) {
            return res.status(404).json({message: "Erro, nenhum usuario encontrado com este e-mail"});
        }

        const batem = await bcryptjs.compare(req.body.senha, usuarioBuscado.senha);

        if(batem) {
            const token = jwt.sign({userId: usuarioBuscado._id}, SECRET, {expiresIn: "1 h"});
            return res.status(200).json({message: "Login realizado com sucesso!!!", token:token});
        } else {
            return res.status(400).json({message: "Erro, senha incorreta"});
        }
    } catch(erro) {
        console.log("Erro interno no servidor, erro: "+erro);
    }
})


module.exports = router;