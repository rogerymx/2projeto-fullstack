require('dotenv').config(); // Carrega as variáveis do arquivo .env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression");

const app = express();

// Middleware para compactação de respostas
app.use(compression());

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para habilitar CORS
app.use(cors());

// Configuração do Pool de Conexões do MongoDB usando variável de ambiente
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB conectado...");
    })
    .catch((err) => {
        console.error("Erro ao conectar ao MongoDB:", err);
    });

// Rotas para API
const usuarioRoutes = require("./routes/usuarios");
const pessoaRoutes = require("./routes/pessoas");
app.use("/usuarios", usuarioRoutes);
app.use("/pessoas", pessoaRoutes);

// Middleware para tratar erros 404 (Rota não encontrada)
app.use((req, res, next) => {
    res.status(404).json({ message: "Rota não encontrada" });
});

// Middleware para tratamento de erros globais
app.use((err, req, res, next) => {
    console.error("Erro no servidor:", err);
    res.status(500).json({ message: "Erro interno no servidor" });
});

// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
