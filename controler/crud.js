const express = require('express')
const conexion = require('../database/db')

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
exports.guardarPaciente = (req, res) => {
    const nombre = req.body.nombre
    const apellido = req.body.lastName
    const cedula = req.body.cedula
    const edad = req.body.edad
    const telefono = req.body.telefono
    console.log(req.body)
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
    console.log(req.body)
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
    const nombre = req.body.nombre
    const especialidad = req.body.especialidad
    console.log(req.body)
    var comando = "INSERT INTO cita (cedula, nombre, especialidad) VALUES ("
    comando += cedula + ",'" + nombre + "','" + especialidad + "')"
    console.log(comando)
    conexion.query(comando, (error, resultado) =>{
        if(error){
            console.log(error)
        } else{
            res.redirect("/listaCitas")
        }
    })
}