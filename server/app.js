const express = require("express");
const app = express();
const port = 3002;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const rotaUsuarios = require("./routes/usuarios");

//config
    //mongoose
    mongoose.connect("mongodb+srv://rogmot:vIFRuQlHP7nUAadG@cluster0.zrbpx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
        console.log("Conectado ao banco de dados com sucesso!!!");
    }).catch((erro) => {
        console.log("Erro ao se conectar ao banco de dados, erro: "+erro);
    })

    //body-parser
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

//rotas
app.get("/", (req,res) => {
    res.send("Ola mundo");
})

app.use("/usuarios", rotaUsuarios);


//server
app.listen(port, () => {
    console.log("Servidor rodando na porta "+port);
})