const express = require("express")
const server = express()
const rotas = require("./rotas/rotas")
const bodyParser = require("body-parser")

//views
server.set('view engine',  'ejs')

//static
server.use(express.static("public"))

//body-parser
server.use(bodyParser.urlencoded({ extended: false }))

//mongoose


//rotas
server.use(rotas)


server.listen(3333, () => console.log('Servidor funfando'))