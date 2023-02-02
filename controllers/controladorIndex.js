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
       
        

        let mes = new Date().toLocaleString("es-CO", {timeZone: "America/Bogota"}).slice(2,3);
        
        let mesNombre;
        switch (mes) {
            case "1":
                mesNombre = "Enero";
                break;
            case "2":
                mesNombre = "Febrero";
                break;
            case "3":
                mesNombre = "Marzo";
                break;
            case "4":
                mesNombre = "Abril";
                break;
            case "5":
                mesNombre = "Mayo";
                break;
            case "6":
                mesNombre = "Junio";
                break;
            case "7":
                mesNombre = "Julio";
                break;
            case "8":
                mesNombre = "Agosto";
                break;
            case "9":
                mesNombre = "Septiembre";
                break;
            case "10":
                mesNombre = "Octubre";
                break;
            case "11":
                mesNombre = "Noviembre";
                break;
            case "12":
                mesNombre = "Diciembre";
                break;
            default:
                mesNombre = "No se encontro el mes";
                break;
        }

        const dato = {
            id: datos.length > 0 ? datos[datos.length - 1].id + 1 : 1,
            nombre: empleado.nombre, 
            sede: empleado.sede,
            usuario: empleado.usuario,
            zona: arreglofinal[0].valor,
            subZonas: arreglofinal[1].valor,
            tipoControl: arreglofinal.slice(2,20),
            // FECHA UTC DE COLOMBIA
            fecha : new Date().toLocaleString("es-CO", {timeZone: "America/Bogota"}),
            mes : mesNombre, 
            ano : new Date().toLocaleString("es-CO", {timeZone: "America/Bogota"}).slice(4,10),
               
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
    },
    vistaMensual: (req, res) => {  
        const datos = archivosDatosFormularios.leerArchivo();

        res.render('./informacionMensual', {datos: datos } );
    },


    }


module.exports = controller;