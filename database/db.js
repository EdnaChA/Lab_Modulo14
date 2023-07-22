const mysql = require('mysql')

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'medical_db'
})

conexion.connect((error)=>{
    if(error){
        console.log("Error de conexión:" + error)
        return 
    }
    console.log("Conexión exítosa a mySQL")
})

module.exports = conexion