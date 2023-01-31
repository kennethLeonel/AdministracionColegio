const path = require('path');
const fs = require('fs');


const funcionesArchivos = {

    leerArchivo: () => {

        const archivo = path.join(__dirname, '../db/archivoDatosFormularios.json');
        let contenido = fs.readFileSync(archivo, 'utf-8');
        return JSON.parse(contenido);
    },
    escribirArchivo: (empleados) => {
        const archivo = path.join(__dirname, '../db/archivoDatosFormularios.json');
        let contenido = JSON.stringify(empleados, null, ' ');
        fs.writeFileSync(archivo, contenido);
    },
}

module.exports = funcionesArchivos;