const archivo = require('../db/funcionesArchvios');
const Swal = require('sweetalert2')

const controller = {
    vista: (req, res) => {

       const empleados = archivo.leerArchivo();
   
        res.render('./admin/datosEmpleados', {empleados: empleados });
    },
    vistaCrear: (req, res) => {
         res.render('./admin/crearEmpleado');

     },
     vistaEditar: (req, res) => {
        const id = req.params.id;
        const empleados = archivo.leerArchivo();
        const empleado = empleados.find(empleado => empleado.id == id);
        
        res.render('./admin/editarEmpleado', {empleado: empleado});

    },
    crearEmpleado: (req, res) => {

        const empleados = archivo.leerArchivo();
        const empleado = {
            id: empleados[empleados.length - 1].id + 1,
            nombre: req.body.nombre,
            edad: req.body.edad,
            correo: req.body.correo,
            sede: req.body.sede,
            usuario: req.body.usuario,
            contra: req.body.contra
            
        }
        empleados.push(empleado);
        archivo.escribirArchivo(empleados);
        console.log("Se creo el empleado");
        res.redirect('/administrador');
    },
    editarEmpleado: (req, res) => {
        const empleados = archivo.leerArchivo();
        const id = req.params.id;
        console.log(id);
        let empleadoEditado = empleados.find(empleado => empleado.id == id);
        console.log(empleadoEditado);
        empleadoEditado.nombre = req.body.nombre;
        empleadoEditado.edad = req.body.edad;
        empleadoEditado.correo = req.body.correo;
        empleadoEditado.sede = req.body.sede;
        empleadoEditado.usuario = req.body.usuario;
        empleadoEditado.contra = req.body.contra;
        archivo.escribirArchivo(empleados);
        console.log("Se edito el empleado");
        res.redirect('/administrador');

    },
    eliminarEmpleado: (req, res) => {
        const empleados = archivo.leerArchivo();
        const id = req.params.id;
        const empleadosFiltrados = empleados.filter(empleado => empleado.id != id);
        archivo.escribirArchivo(empleadosFiltrados);
        console.log("Se elimino el empleado correctamente");
        res.redirect('/administrador');
    },
  

}

module.exports = controller;