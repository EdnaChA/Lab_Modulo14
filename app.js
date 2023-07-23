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
/*Renderizado pagina principal*/
server.get('/', (req, res) =>{
    res.render("index")
})
/*Renderizado paginas de formularios*/
server.get('/crearPaciente', (req, res) =>{
    res.render("crearPaciente")
})
server.get('/crearDoctor', (req, res) =>{
    res.render("crearDoctor")
})
server.get('/crearCita', (req, res) =>{
    res.render("crearCita")
})
/*Funciones que guardan los datos en la BD*/
server.post('/guardarPaciente', crud.guardarPaciente)
server.post('/guardarDoctor', crud.guardarDoctor)
server.post('/guardarCita', crud.guardarCita)

/*Funciones de consulta y renderizado de listas*/
server.get('/listaPacientes', crud.consultarPacientes)
server.get('/listaDoctores', crud.consultarDoctores)
server.get('/listaCitas', crud.consultarCitas)

//Rutas API
/*Funciones para agregar datos utilizando API*/
server.post('/api/agregarPacientes/', crud.api_agregarPacientes)
server.post('/api/agregarDoctores/', crud.api_agregarDoctores)
server.post('/api/agregarCita/', crud.api_agregarCitaMedica)
/*Funciones para consultar los datos utilizando API*/
server.get('/api/pacientes', crud.api_consultaPacientes)
server.get('/api/doctores', crud.api_consultaDoctores)
server.get('/api/citas', crud.api_consultaCitasMedicas)

server.listen(PORT, () =>{
    console.log("Servidor funcionando en http://localhost:" + PORT)
})
