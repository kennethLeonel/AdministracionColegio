const archivo = require('../db/funcionesArchvios');
const archivosDatosFormularios = require('../db/funcionesArchivoDatosFormularios');
const localStorage = require("localStorage");
let usuario , contra;

const controller = {

    vista: (req, res) => {
        res.render('../views/index');
    },
    realizarLogin: (req, res) => {
        
         usuario = req.body.usuario;
         contra = req.body.contra;
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
        const empleados = archivo.leerArchivo();
        let empleado = empleados.find(empleado => empleado.usuario == usuario && empleado.contra == contra);
        res.render('./formularioEmpleado', {empleadoLogin: empleado } );

       
    },
    datosFormulario : (req, res) => {     
        const datos = archivosDatosFormularios.leerArchivo();
        const empleados = archivo.leerArchivo();
        let empleado = empleados.find(empleado => empleado.usuario == usuario && empleado.contra == contra);
        
    
        const dato = {
            id: datos.length > 0 ? datos[datos.length - 1].id + 1 : 1,
            nombre: empleado.nombre,
            sede: empleado.sede,
            usuario: empleado.usuario,
            zona: req.body.zona,
            tipoControl: req.body.tipoControl

        
            
        }
        datos.push(dato);
        archivosDatosFormularios.escribirArchivo(datos);
        console.log("Se creo datos form");
        res.redirect('./administrador'); // Hacer una vista Home 

    }
    }


module.exports = controller;