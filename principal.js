const express = require("express")
const server = express()
const rotas = require("./rotas/rotas")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

//views
server.set('view engine',  'ejs')

//static
server.use(express.static("public"))

//body-parser
server.use(bodyParser.urlencoded({ extended: false }))

//mongoose
mongoose.connect("mongodb://localhost/discover")
.then(() => console.log("coneção com o banco funfando"))
.catch(() => console.log("coneção com o banco nao esta funfando"))

//rotas
server.use(rotas)


server.listen(3333, () => console.log('Servidor funfando'))