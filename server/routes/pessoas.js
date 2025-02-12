const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
require("../models/Pessoa");
const Pessoa = mongoose.model("pessoas");
const auth = require("../auth/auth");

//rota para adicionar uma pessoa
router.post("/", auth.verificaUser, async (req, res) => {
    if (!req.body.nome || typeof req.body.nome === undefined || req.body.nome === null) {
        return res.status(400).json({ message: "Erro, nome inválido" });
    }

    if (!req.body.idade || typeof req.body.idade === undefined || req.body.idade === null) {
        return res.status(400).json({ message: "Erro, idade inválida" });
    }

    if (req.body.idade < 0) {
        return res.status(400).json({ message: "Erro, não é possível colocar uma idade abaixo de 0" });
    }

    if (!req.body.genero || typeof req.body.genero === undefined || req.body.genero === null) {
        return res.status(400).json({ message: "Erro, gênero inválido" });
    }

    try {
        const genero = req.body.genero.toLowerCase();

        if (genero !== "masculino" && genero !== "feminino") {
            return res.status(400).json({ message: "Erro, gênero inválido" });
        }

        if (!req.body.email || typeof req.body.email === undefined || req.body.email === null) {
            return res.status(400).json({ message: "Erro, e-mail inválido" });
        }

        // Lista de URLs de imagens aleatórias
        const imageUrls = [
            "https://m.media-amazon.com/images/I/61d+MhFjaAL._AC_UF1000,1000_QL80_.jpg",
            "https://acdn.mitiendanube.com/stores/823/740/products/pendure_quadro_____1-copia-41-bd84db09085a9f334f16587623908727-640-0.png"
        ];

        // Seleciona uma imagem aleatória
        const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
        
        // Cria a nova pessoa com a imagem aleatória
        const novaPessoa = new Pessoa({
            nome: req.body.nome,
            idade: req.body.idade,
            genero: genero,
            email: req.body.email,
            imagem: randomImage, // Adiciona o URL da imagem aleatória
        });

        const pessoaSalva = await novaPessoa.save();
        return res.status(201).json({ message: "Pessoa adicionada com sucesso!!!", pessoaSalva });
    } catch (erro) {
        console.log("Erro interno no servidor, erro: " + erro);
        return res.status(500).json({ message: "Erro interno no servidor." });
    }
});

//rota para ver todas as pessoas adicionadas
router.get("/", async (req, res) => {
    try {
        const pessoas = await Pessoa.find();
        return res.status(200).json(pessoas);
    } catch (erro) {
        console.log("Erro interno no servidor, erro: " + erro);
    }
})

router.get("/buscar", auth.verificaUser, async (req, res) => {
    if (!req.body.nome || typeof req.body.nome === undefined || req.body.nome === null) {
        return res.status(400).json({ message: "Erro, nome invalido" });
    }

    try {
        const pessoas = await Pessoa.find({ nome: { $regex: req.body.nome, $options: "i" } });

        if (pessoas.length === 0) {
            return res.status(404).json({ message: "Erro, nenhuma pessoa encontrada com este nome" });
        };

        return res.status(200).json(pessoas);
    } catch (erro) {
        console.log("Erro interno no servidor, erro: " + erro);
    }
})

module.exports = router;