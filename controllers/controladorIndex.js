const empleados = require('../db/archivoEmpleador.json');
const Swal = require('sweetalert2')
const controller = {

    vista: (req, res) => {
        res.render('../views/index');
    },
    realizarLogin: (req, res) => {
        console.log("hola",req.body);
        let usuario = req.body.usuario;
        let contra = req.body.contra;
        console.log(usuario);
        console.log(contra);
        let empleado = empleados.find(empleado => empleado.usuario == usuario && empleado.contra == contra);
        console.log(empleado);
        if(empleado != undefined){   
        res.render('./formularioEmpleado', {empleadoLogin: empleado});
        }else{
            res.render('./index', {error: "Usuario o contraseña incorrectos"});
        }
        }
    }


module.exports = controller;