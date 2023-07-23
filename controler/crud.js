const express = require('express')
const conexion = require('../database/db')

/*Funciones de consulta de listas*/
exports.consultarPacientes = (req, res) =>{
    conexion.query('select*from paciente',(error, consulta) =>{
        if(error){
            console.log('Error consultando tabla Paciente '+ error)
            return
        }
        else{
            res.render('pacientes',{
                consulta1:consulta
            })
        }
    })
}
exports.consultarDoctores = (req, res) =>{
    conexion.query('select*from doctor',(error, consulta) =>{
        if(error){
            console.log('Error consultando tabla Doctor '+ error)
            return
        }
        else{
            res.render('doctores',{
                consulta1:consulta
            })
        }
    })
}

exports.consultarCitas = (req, res) =>{
    conexion.query('select*from cita',(error, consulta) =>{
        if(error){
            console.log('Error consultando tabla Cita '+ error)
            return
        }
        else{
            res.render('citas',{
                consulta1:consulta
            })
        }
    })
}
/*Funciones que guardan los datos de los formularios en la BD*/
exports.guardarPaciente = (req, res) => {
    const nombre = req.body.nombre
    const apellido = req.body.lastName
    const cedula = req.body.cedula
    const edad = req.body.edad
    const telefono = req.body.telefono
    var comando = "INSERT INTO paciente (nombre, apellido, cedula, edad, telefono) VALUES ('"
    comando += nombre + "','" + apellido + "'," + cedula + "," + edad + ",'" + telefono + "')"
    console.log(comando)
    conexion.query(comando, (error, resultado) =>{
        if(error){
            console.log(error)
        } else{
            res.redirect("/listaPacientes")
        }
    })
}
exports.guardarDoctor = (req, res) => {
    const nombre = req.body.nombre
    const apellido = req.body.lastName
    const especialidad = req.body.especialidad
    const consultorio = req.body.consultorio
    const correo = req.body.correo
    var comando = "INSERT INTO doctor (nombre, apellido, especialidad, consultorio, correo) VALUES ('"
    comando += nombre + "','" + apellido + "','" + especialidad + "'," + consultorio + ",'" + correo + "')"
    console.log(comando)
    conexion.query(comando, (error, resultado) =>{
        if(error){
            console.log(error)
        } else{
            res.redirect("/listaDoctores")
        }
    })
}
exports.guardarCita = (req, res) => {
    const cedula = req.body.cedula
    const especialidad = req.body.especialidad
    const fecha = req.body.fecha
    conexion.query("select*from paciente WHERE cedula ='" + cedula + "'" ,(error, consultaPaciente) =>{
        if(error){
            console.log('Error consultando la cedula en la tabla Paciente')
            return
        }
        else{
            
            var nombreP = consultaPaciente[0].nombre
            var apellidoP = consultaPaciente[0].apellido

            conexion.query("select*from doctor WHERE especialidad = '" + especialidad + "'",(error, consultaDoctor) =>{
                if(error){
                    console.log('Error consultando la especialidad en la tabla Doctor ')
                    return
                }
                else{
                    var nombreD = consultaDoctor[0].nombre
                    var apellidoD = consultaDoctor[0].apellido
        
                    var comando = "INSERT INTO cita (fecha, cedula, paciente, especialidad, doctor) VALUES ("
                    comando += "'" + fecha + "','" + cedula + "','" + nombreP + " " + apellidoP + "','" + especialidad + "','" + nombreD + " " + apellidoD +"')"
                    console.log(comando)

                    conexion.query(comando, (error, resultado) =>{
                        if(error){
                            console.log(error)
                        } else{
                            res.redirect("/listaCitas")
                        }
                    })
                }
            })


        }
    })
}

//API
exports.api_consultaPacientes = (req, res) =>{
    conexion.query('select*from paciente',(error, consulta) =>{
        if(error){
            console.log('Error consultando tabla Paciente '+error)
            return
        }
        else{
            res.send(consulta)
        }
    })
}
exports.api_consultaDoctores = (req, res) =>{
    conexion.query('select*from doctor',(error, consulta) =>{
        if(error){
            console.log('Error consultando tabla Doctor '+error)
            return
        }
        else{
            res.send(consulta)
        }
    })
}
exports.api_consultaCitasMedicas = (req, res) =>{
    conexion.query('select*from cita',(error, consulta) =>{
        if(error){
            console.log('Error consultando tabla Cita '+error)
            return
        }
        else{
            res.send(consulta)
        }
    })
}

exports.api_agregarPacientes = (req, res) => {
    const nombre = req.query.nombre
    const apellido = req.query.lastName
    const cedula = req.query.cedula
    const edad = req.query.edad
    const telefono = req.query.telefono

    var comando = "INSERT INTO paciente (nombre, apellido, cedula, edad, telefono) VALUES ('"
    comando += nombre + "','" + apellido + "'," + cedula + "," + edad + ",'" + telefono + "')"
    console.log(comando)
    conexion.query(comando, (error, resultado) =>{
        if(error){
            console.log(error)
            return
        } else{
            res.send("Paciente agregado correctamente")
        }
    })
}
exports.api_agregarDoctores = (req, res) => {
    const nombre = req.query.nombre
    const apellido = req.query.lastName
    const especialidad = req.query.especialidad
    const consultorio = req.query.consultorio
    const correo = req.query.correo
    var comando = "INSERT INTO doctor (nombre, apellido, especialidad, consultorio, correo) VALUES ('"
    comando += nombre + "','" + apellido + "','" + especialidad + "'," + consultorio + ",'" + correo + "')"
    console.log(comando)
    conexion.query(comando, (error, resultado) =>{
        if(error){
            console.log(error)
            return
        } else{
            res.send("Doctor/a agregado/a correctamente")
        }
    })
}
exports.api_agregarCitaMedica = (req, res) => {
    const cedula = req.query.cedula
    const especialidad = req.query.especialidad
    const fecha = req.query.fecha
    conexion.query("select*from paciente WHERE cedula ='" + cedula + "'" ,(error, consultaPaciente) =>{
        if(error){
            console.log('Error consultando la cedula en la tabla Paciente')
            return
        }
        else{
            
            var nombreP = consultaPaciente[0].nombre
            var apellidoP = consultaPaciente[0].apellido
    
            conexion.query("select*from doctor WHERE especialidad = '" + especialidad + "'",(error, consultaDoctor) =>{
                if(error){
                    console.log('Error consultando la especialidad en la tabla Doctor ')
                    return
                }
                else{
                    var nombreD = consultaDoctor[0].nombre
                    var apellidoD = consultaDoctor[0].apellido
        
                    var comando = "INSERT INTO cita (fecha, cedula, paciente, especialidad, doctor) VALUES ("
                    comando += "'" + fecha + "','" + cedula + "','" + nombreP + " " + apellidoP + "','" + especialidad + "','" + nombreD + " " + apellidoD +"')"
                    console.log(comando)
    
                    conexion.query(comando, (error, resultado) =>{
                        if(error){
                            console.log(error)
                        } else{
                            res.send("Cita médica agregada correctamente")
                        }
                    })
                }
            })
    
    
        }
    })
}

