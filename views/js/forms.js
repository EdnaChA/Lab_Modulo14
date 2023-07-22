const botonSendPatient = document.getElementById("send_patient")
const botonSendDoctor = document.getElementById("send_doctor")

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

botonSendPatient.onclick = function(){   
    if(validatePatient() == true){

        alert("Paciente guardado exitosamente.")
        var newPatient = {
            "Nombre":patientName.value,
            "Apellido": patientLastName.value,
            "Cedula": patientCedula.value,
            "Edad": patientAge.value,
            "Telefono":patientPhone.value,
            "Especialidad": patientSpecialty.value
        }
        var patientJSON = JSON.stringify(newPatient)
        var data = JSON.parse(patientJSON)
        salidaPatient.innerHTML += "<tr><td>"+data.Nombre+
                                    "</td><td>"+data.Apellido+
                                    "</td><td>"+data.Cedula+
                                    "</td><td>"+data.Edad+
                                    "</td><td>"+data.Telefono+
                                    "</td><td>"+data.Especialidad+"</td></tr>"
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
        var newDoctor = {
            "Nombre":doctorName.value,
            "Apellido": doctorLastName.value,
            "Cedula": doctorCedula.value,
            "Especialidad": doctorSpecialty.value,
            "Consultorio": doctorOffice.value,
            "Correo":doctorEmail.value
        }
        var doctorJSON = JSON.stringify(newDoctor)
        var data = JSON.parse(doctorJSON)
        salidaDoctor.innerHTML += "<tr><td>"+data.Nombre+
                                "</td><td>"+data.Apellido+
                                "</td><td>"+data.Cedula+
                                "</td><td>"+data.Especialidad+
                                "</td><td>"+data.Consultorio+
                                "</td><td>"+data.Correo+"</td></tr>"
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
    if (!cedulaRegex.test(doctorCedula.value)) {
        alert("El número de cédula del doctor es invalido. Recuerde que debe contener 9 dígitos.")
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