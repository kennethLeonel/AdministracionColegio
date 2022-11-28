const archivo = require('../db/funcionesArchvios');
const archivosDatosFormularios = require('../db/funcionesArchivoDatosFormularios');
const localStorage = require("localStorage");

const controller = {

    vista: (req, res) => {
        res.render('../views/index');
    },
    realizarLogin: (req, res) => {
        
        let usuario = req.body.usuario;
        let contra = req.body.contra;
        const empleados = archivo.leerArchivo();
        let empleado = empleados.find(empleado => empleado.usuario == usuario && empleado.contra == contra);
      
        if(empleado != undefined){      


        localStorage.setItem('usuario', empleado.usuario);
        localStorage.setItem('sede', empleado.sede);
  
      
        res.render('./formularioEmpleado', {empleadoLogin: empleado } );
        }else{
            res.render('./index', {error: "Usuario o contraseña incorrectos"});
        }
        },
    cerrar :(req, res) => {
        localStorage.clear();
        res.render('./index');
    },
    vistaEmpleado : (req, res) => {
        res.render('./formularioEmpleado');
    },
    datosFormulario : (req, res) => {
              
        const datos = archivosDatosFormularios.leerArchivo();
        console.log(datos);
       
        const dato = {
            id: datos.length > 0 ? empleados[datos.length - 1].id + 1 : 1,
            nombre: req.body.nombre,
            edad: req.body.edad,
            correo: req.body.correo,
            sede: req.body.sede,
            usuario: req.body.usuario,
            contra: req.body.contra
            
        }
        datos.push(dato);
        archivosDatosFormularios.escribirArchivo(datos);
        console.log("Se creo datos form");
        res.redirect('./formularioEmpleado'); // Hacer una vista Home 

    }
    }


module.exports = controller;