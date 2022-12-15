const archivo = require('../db/funcionesArchvios');
const archivosDatosFormularios = require('../db/funcionesArchivoDatosFormularios');

let usuario , contra;
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  
  
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
        localStorage.setItem('contra', empleado.contra);

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
        usuario =localStorage.getItem('usuario');
         contra = localStorage.getItem('contra'); 
        let empleado = empleados.find(empleado => empleado.usuario == usuario && empleado.contra == contra);
       
        res.render('./formularioEmpleado', {empleadoLogin: empleado } );

       
    },
    datosFormulario : (req, res) => {     
        const datos = archivosDatosFormularios.leerArchivo();
        const empleados = archivo.leerArchivo();
        let empleado = empleados.find(empleado => empleado.usuario == usuario && empleado.contra == contra);
        let datosForm = req.body;
        // for (let clave in datosForm){
        //     console.log(datosForm[clave]);
        //   }
        let arreglofinal = [];
        let claves = Object.keys(datosForm); // claves = ["zona", "subzona", "tipoControl", "edad"]
        for(let i=0; i< claves.length; i++){
        let clave = claves[i];
        let valor = datosForm[clave];
        arreglofinal.push({
            clave: clave,
            valor: valor
        }); 
        }   
       
        



        const dato = {
            id: datos.length > 0 ? datos[datos.length - 1].id + 1 : 1,
            nombre: empleado.nombre, 
            sede: empleado.sede,
            usuario: empleado.usuario,
            zona: arreglofinal[0].valor,
            subZonas: arreglofinal[1].valor,
            tipoControl: arreglofinal.slice(2,20),
            fecha: new Date()      
        }
        console.log(dato, "esto es lo que guardoi");
    
        agregarDato(dato);

        function agregarDato (dato){

            datos.push(dato);
            archivosDatosFormularios.escribirArchivo(datos);
            console.log("Se creo datos form");
            res.redirect('./administrador'); // Hacer una vista Home 
        }
        
      

    },
    vistaHome: (req, res) => {  
        const datos = archivosDatosFormularios.leerArchivo();

        res.render('./home', {datos: datos } );
    }
    }


module.exports = controller;