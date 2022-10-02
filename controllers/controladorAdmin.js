const archivo = require('../db/funcionesArchvios');


const controller = {
    vista: (req, res) => {

       const empleados = archivo.leerArchivo();
       console.log(empleados);
        res.render('./admin/datosEmpleados', {empleados: empleados });
    },
    vistaCrear: (req, res) => {
         res.render('./admin/crearEmpleado');

     },
     vistaEditar: (req, res) => {
        res.render('./admin/editarEmpleado');

    }

}

module.exports = controller;