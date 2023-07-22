// npm install express ejs mysql   
// npm install -g nodemon

const express = require('express')
const server = express()
const PORT = process.env.PORT || 8083

server.set("view engine", 'ejs')

const conexion = require('./database/db')
const crud = require('./controler/crud')

server.use(express.urlencoded({extended:false}))
server.use(express.json())
server.use(express.static('./database')) //Modelo
server.use(express.static('./views')) //Vista 
server.use(express.static('./controler')) //Controlador

//Rutas
server.get('/', (req, res) =>{
    res.render("index")
})
server.get('/listaPacientes', crud.consultarPacientes)
server.get('/listaDoctores', crud.consultarDoctores)
server.get('/listaCitas', crud.consultarCitas)

server.get('/crearPaciente', (req, res) =>{
    res.render("crearPaciente")
})
server.get('/crearDoctor', (req, res) =>{
    res.render("crearDoctor")
})
server.get('/crearCita', (req, res) =>{
    res.render("crearCita")
})

server.post('/guardarPaciente', crud.guardarPaciente)
server.post('/guardarDoctor', crud.guardarDoctor)
server.post('/guardarCita', crud.guardarCita)


server.listen(PORT, () =>{
    console.log("Servidor funcionando en http://localhost:" + PORT)
})
