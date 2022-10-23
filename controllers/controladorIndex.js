const empleados = require('../db/archivoEmpleador.json');

const store = require('store')
const controller = {

    vista: (req, res) => {
        res.render('../views/index');
    },
    realizarLogin: (req, res) => {
        
        let usuario = req.body.usuario;
        let contra = req.body.contra;
  
        let empleado = empleados.find(empleado => empleado.usuario == usuario && empleado.contra == contra);
      
        if(empleado != undefined){      
         store.set('usuario', {usuario: empleado.usuario});
         store.set('sede',{sede: empleado.sede});
      
        res.render('./formularioEmpleado', {empleadoLogin: empleado , sede: store.get('sede').sede} );
        }else{
            res.render('./index', {error: "Usuario o contraseña incorrectos"});
        }
        },
    cerrar :(req, res) => {
        store.clearAll();
        res.render('./index');
    },
    vistaEmpleado : (req, res) => {
        res.render('./formularioEmpleado');
    }
    }


module.exports = controller;