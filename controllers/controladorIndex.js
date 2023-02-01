const archivo = require('../db/funcionesArchvios');
const archivosDatosFormularios = require('../db/funcionesArchivoDatosFormularios');


  
  
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


        // condición rol depedniendo de ese rol hacemos condiciones y redireccionamos, toca pasar un atributo que es el rol y de ea forma controlamos la navegación
        if (empleado.rol == "Administrador"){
                const empleados = archivo.leerArchivo();
                res.render('./Admin/datosEmpleados', {empleados: empleados , rol: empleado.rol});
         }else if(empleado.rol == "Empleado"){
            res.render('./formularioEmpleado', {empleadoLogin: empleado , rol: empleado.rol} );
            }
            else if (empleado.rol == "Salud"){
                const datos = archivosDatosFormularios.leerArchivo();
                res.render('./home',{datos: datos , rol: empleado.rol});
            }
        }else{
            res.render('./index', {error: "Usuario o contraseña incorrectos"});
        }
        },
    cerrar :(req, res) => {

      
        res.render('./index');
    },
    vistaEmpleado : (req, res) => {
        const empleados = archivo.leerArchivo();
        let empleado = empleados.find(empleado => empleado.usuario == usuario && empleado.contra == contra);
       
        res.render('./formularioEmpleado', {empleadoLogin: empleado,  rol :"Empleado" } );

       
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
       
        

        let mes = new Date().toLocaleString("es-CO", {timeZone: "America/Bogota"}).slice(3,4);
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
            ano : new Date().toLocaleString("es-CO", {timeZone: "America/Bogota"}).slice(5,10),
               
        }
        console.log(dato, "esto es lo que guardoi");
    
        agregarDato(dato);

        function agregarDato (dato){

            datos.push(dato);
            archivosDatosFormularios.escribirArchivo(datos);
            console.log("Se creo datos form");
            res.redirect('./formularioEmpleado'); // Hacer una vista Home 
        }
        
      

    },
    vistaHome: (req, res) => {  
        const datos = archivosDatosFormularios.leerArchivo();

        res.render('./home', {datos: datos ,rol :"Salud" } );
    },
    vistaMensual: (req, res) => {  
        const datos = archivosDatosFormularios.leerArchivo();

        res.render('./informacionMensual', {datos: datos,rol :"Salud" } );
    },


    }


module.exports = controller;