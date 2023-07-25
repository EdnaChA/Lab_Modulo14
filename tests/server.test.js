const {server, serverListen} = require('../app')
const request = require('supertest')
const conexion = require('../database/db')
const crud = require('../controler/crud')

beforeEach((done) => {
    conexion.query('DELETE FROM paciente', () => {
        const pacientes = [
            {nombre:'Paula', apellido: 'Ayala', cedula: 103178945, edad:29, telefono: '3013203409'},
            {nombre:'Edna', apellido:'Chaparro', cedula: 123456789, edad:30, telefono:'3202053509'},
            {nombre:'Carolina', apellido:'Acosta',cedula: 123567894, edad:25, telefono:'3006703380'},
            {nombre:'Isabela', apellido:'Barragan', cedula:123789456, edad:22, telefono:'3112050835'},
            {nombre:'Nicolas', apellido:'Muñoz', cedula:421039393, edad:34, telefono:'3162223989'}
        ];
        conexion.query(
            'INSERT INTO paciente (`nombre`, `apellido`, `cedula`, `edad`, `telefono`) VALUES ?',
            [pacientes.map(paciente => Object.values(paciente))],
            () => {
                done();
            }
        )
    })
    conexion.query('DELETE FROM doctor', () => {
        const doctores = [
            {nombre:'Andrea', apellido:'Ceballos', especialidad:'Medicina General', consultorio:408, correo:'a.ceballos@gmail.com'},
            {nombre:'Andrea', apellido:'Ruiz', especialidad:'Rehabilitación Física', consultorio:401, correo:'a.ruiz@gmail.com'},
            {nombre:'Audhrey', apellido:'Diaz', especialidad:'Medicina General', consultorio:519, correo:'andrea.diaz@gmail.com'},
            {nombre:'Daniela', apellido:'Acosta', especialidad:'Medicina Interna', consultorio:205, correo:'d.acosta@gmail.com'},
            {nombre:'Erika', apellido:'Villareal', especialidad:'Dermatología', consultorio:808, correo:'e.villareal@gmail.com'},
            {nombre:'Fernando', apellido:'Fonseca', especialidad:'Medicina Interna', consultorio:909, correo:'f.fonseca@gmail.com'},
            {nombre:'Gloria', apellido:'Rey', especialidad:'Odontología', consultorio:607, correo:'gloria.rey@gmail.com'},
            {nombre:'Helena', apellido:'Silva', especialidad:'Radiología', consultorio:100, correo:'silva.helena@gmail.com'},
            {nombre:'Jennifer', apellido:'Toro', especialidad:'Psicología', consultorio:312, correo:'j.toro@gmail.com'},
            {nombre:'Nestor', apellido:'Ortiz', especialidad:'Cardiología', consultorio:610, correo:'n.ortiz@gmail.com'}
        ];
        conexion.query(
            'INSERT INTO doctor (`nombre`, `apellido`, `especialidad`, `consultorio`, `correo`) VALUES ?',
            [doctores.map(doctor => Object.values(doctor))],
            () => {
                done();
            }
        )
    })
    conexion.query('DELETE FROM cita', () => {
        const citas = [
            {fecha: '2023-10-21', cedula: 123456789, paciente: 'Edna Chaparro', especialidad:'Odontología', doctor:'Gloria Rey'}
        ];
        conexion.query(
            'INSERT INTO cita (`fecha`, `cedula`, `paciente`, `especialidad`, `doctor`) VALUES ?',
            [citas.map(cita => Object.values(cita))],
            () => {
                done();
            }
        )
    })
})

//Test de ruteo
describe("Test de ruteo", () => {
    test('Ruta index', async () => {
        const response = await request(server).get('/').send()
        expect(response.statusCode).toBe(200)
        expect(response.status).toBe(200)
    })
    test('Ruta /crearPaciente', async () => {
        const response = await request(server).get('/crearPaciente').send()
        expect(response.statusCode).toBe(200)
        expect(response.status).toBe(200)
    })
    test('Ruta /crearDoctor', async () => {
        const response = await request(server).get('/crearDoctor').send()
        expect(response.statusCode).toBe(200)
        expect(response.status).toBe(200)
    })
    test('Ruta /crearCita', async () => {
        const response = await request(server).get('/crearCita').send()
        expect(response.statusCode).toBe(200)
        expect(response.status).toBe(200)
    })
    test('Ruta no válida', async () => {
        const response = await request(server).get('/prueba').send()
        expect(response.status).toBe(404)
    })
})
//Test de consultas de listados
describe("Test consultas de listados", () => {
    test('Ruta /api/Pacientes', async () => {
        const response = await request(server).get('/api/pacientes').send()
        expect(response.statusCode).toBe(200)
        expect(response.status).toBe(200)
        expect(response.header['content-type']).toMatch("json")
        expect(response.body).toHaveLength(5)
        expect(response.body).toBeInstanceOf(Array)
        const tuplas = response.body.map(pacientes => pacientes.nombre)
        console.log("Mi mapeo de pacientes: " + tuplas)
        expect(tuplas).toContain("Edna")
    })
    test('Ruta /api/doctores', async () => {
        const response = await request(server).get('/api/doctores').send()
        expect(response.statusCode).toBe(200)
        expect(response.status).toBe(200)
        expect(response.header['content-type']).toMatch("json")
        expect(response.body).toHaveLength(10)
        expect(response.body).toBeInstanceOf(Array)
        const tuplas = response.body.map(doctora => doctora.nombre)
        console.log("Mi mapeo de doctoras: " + tuplas)
        expect(tuplas).toContain("Gloria")
    })
    test('Ruta /api/citas', async () => {
        const response = await request(server).get('/api/citas').send()
        expect(response.statusCode).toBe(200)
        expect(response.status).toBe(200)
        expect(response.header['content-type']).toMatch("json")
        expect(response.body).toHaveLength(1)
        expect(response.body).toBeInstanceOf(Array)
        const tuplas = response.body.map(cita => cita.paciente)
        console.log("Mi mapeo de citas: " + tuplas)
        expect(tuplas).toContain("Edna Chaparro")
    })
})

describe("Test funciones POST", () => {
    test('Test de POST agregar paciente', async () => {
        const paciente = {
            nombre: "Felipe",
            apellido: "Gutierrez",
            cedula: 132547698,
            edad: 32,
            telefono: "3022505380"
        }
        const response = await request(server).post('/api/agregarPacientes/').send(paciente)
        expect(response.status).toBe(200)
    })
    test('Test de POST agregar doctor', async () => {
        const doctor = {
            nombre: "Daniela Alejandra",
            lastName: "Acosta Chaparro",
            especialidad: 'Oncología',
            consultorio: 320,
            correo: "d.acosta702@gmail.com"
        }
        const response = await request(server).post('/api/agregarDoctores/').send(doctor)
        expect(response.status).toBe(200)
    })
    test('Test de POST agregar cita', async () => {
        const cita = {
            fecha: "2020-03-19",
            cedula: 123456789,
            especialidad: 'Dermatología',
        }
        const response = await request(server).post('/api/agregarCita/').send(cita)
        expect(response.status).toBe(200)
    })
})

afterAll(() => {
    serverListen.close()
    conexion.end()
})