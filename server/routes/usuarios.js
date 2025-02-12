const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("../models/Usuario");
const Usuario = mongoose.model("Usuario");
const bcryptjs = require("bcryptjs");
const SECRET = "segredojwt123";

router.post("/", async (req, res) => {
    if (!req.body.email || typeof req.body.email === undefined || req.body.email === null) {
        return res.status(400).json({ message: "Erro, e-mail inválido" });
    }

    if (!req.body.senha || typeof req.body.senha === undefined || req.body.senha === null) {
        return res.status(400).json({ message: "Erro, senha inválida" });
    }

    if (req.body.senha.length < 4) {
        return res.status(400).json({ message: "Senha muito curta" });
    }

    try {
        console.log("Senha recebida:", req.body.senha);

        // Gere o salt primeiro
        const salt = await bcryptjs.genSalt(10);

        // Gera o hash da senha
        const hash = await bcryptjs.hash(req.body.senha, salt);

        console.log("Hash gerado:", hash);

        // Cria o novo usuário
        const novoUsuario = new Usuario({
            email: req.body.email,
            senha: hash, // Salva o hash no banco
        });

        const usuarioSalvo = await novoUsuario.save();
        console.log("Usuário salvo com hash:", usuarioSalvo.senha);

        return res.status(201).json({ message: "Conta criada com sucesso!!!", usuarioSalvo: usuarioSalvo });
    } catch (erro) {
        console.log("Erro interno no servidor, erro: " + erro);
        return res.status(500).json({ message: "Erro interno no servidor" });
    }
});


// Rota de login
router.post("/login", async (req, res) => {
    console.log(req.body.email)

    if (!req.body.email || typeof req.body.email === undefined || req.body.email === null) {
        return res.status(400).json({ message: "Erro, e-mail inválido" });
    }

    if (!req.body.senha || typeof req.body.senha === undefined || req.body.senha === null) {
        return res.status(400).json({ message: "Erro, senha inválida" });
    }

    try {
        const usuarioBuscado = await Usuario.findOne({ email: req.body.email });

        if (!usuarioBuscado) {
            return res.status(404).json({ message: "Erro, nenhum usuário encontrado com este e-mail" });
        }

        const batem = await bcryptjs.compare(req.body.senha, usuarioBuscado.senha);
        console.log(batem)
        console.log(usuarioBuscado.senha)
        console.log(req.body.senha)

        if (batem) {
            const token = jwt.sign({ userId: usuarioBuscado._id }, SECRET, { expiresIn: "1h" });
            return res.status(200).json({ message: "Login realizado com sucesso!!!", token: token });
        } else {
            return res.status(400).json({ message: "Erro, senha incorreta" });
        }
    } catch (erro) {
        console.log("Erro interno no servidor, erro: " + erro);
        return res.status(500).json({ message: "Erro interno no servidor" });
    }
});

module.exports = router;
