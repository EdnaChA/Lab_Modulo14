const botonSendPatient = document.getElementById("send_patient")
const botonSendDoctor = document.getElementById("send_doctor")
const botonSendCita = document.getElementById("send_cita")

const patientName = document.getElementById("patientName")
const patientLastName = document.getElementById("patientLastName")
const patientCedula = document.getElementById("patientCedula")
const patientAge = document.getElementById("patientAge")
const patientPhone = document.getElementById("patientPhone")
const patientSpecialty = document.getElementById("patientSpecialty")
const doctorName = document.getElementById("doctorName")
const doctorLastName = document.getElementById("doctorLastName")
const doctorCedula = document.getElementById("doctorCedula")
const doctorSpecialty = document.getElementById("doctorSpecialty")
const doctorOffice = document.getElementById("doctorOffice")
const doctorEmail = document.getElementById("doctorEmail")

const nameRegex = /^[A-Za-z\s]+$/;
const cedulaRegex = /^\d{9}$/;
const ageRegex = /^\d+$/;
const phoneRegex = /^\d{10}$/;
const oficinaRegex = /^\d{3}$/; 
const emailRegex = /^\S+@\S+\.\S+$/;

var salidaPatient = document.getElementById("datos_pacientes")
var salidaDoctor = document.getElementById("datos_doctores")
var salidaDoctor = document.getElementById("datos_citas")

botonSendPatient.onclick = function(){   
    if(validatePatient() == true){

        alert("Paciente guardado exitosamente.")
    }
}

function validatePatient() {
    var camposValidos = true

    if (!nameRegex.test(patientName.value)) {
        alert("El nombre del paciente es invalido.")
        camposValidos = false
    }
    if (!nameRegex.test(patientLastName.value)) {
        alert("El apellido del paciente es invalido.")
        camposValidos = false
    }
    if (!cedulaRegex.test(patientCedula.value)) {
        alert("El numero de cédula del paciente es invalido. Recuerde que debe contener 9 dígitos.")
        camposValidos = false
    }
    if (!ageRegex.test(patientAge.value)) {
        alert("La edad del paciente es invalida")
        camposValidos = false
    }
    if (!phoneRegex.test(patientPhone.value)) {
        alert("El telefono de contacto del paciente es invalido. Recuerde que debe contener 10 dígitos.")
        camposValidos = false
    }
    return camposValidos
}

botonSendDoctor.onclick = function(){   
    if(validateDoctor() == true){
        alert("Doctor guardado exitosamente.")
    }
}

function validateDoctor() {
    var camposValidos = true
    if (!nameRegex.test(doctorName.value)) {
        alert("El nombre del doctor es invalido.")
        camposValidos = false
    }
    if (!nameRegex.test(doctorLastName.value)) {
        alert("El apellido del doctor es invalido.")
        camposValidos = false
    }
    if (!oficinaRegex.test(doctorOffice.value)) {
        alert("El numero de consultorio del doctor es invalido. Recuerde que debe contener 3 dígitos.")
        camposValidos = false
    }
    if (!emailRegex.test(doctorEmail.value)) {
        alert("El correo de contacto del doctor es invalido. Recuerde que debe ser de la forma example@dominio.com")
        camposValidos = false
    }
    return camposValidos
}
botonSendCita.onclick = function(){   
    if(validateInfo() == true){
        alert("Cita médica agendada exitosamente.")
    }
}
function validateInfo() {
    var camposValidos = true
    if (!cedulaRegex.test(patientCedula.value)) {
        alert("El numero de cédula del paciente es invalido. Recuerde que debe contener 9 dígitos.")
        camposValidos = false
    }
    return camposValidos
}