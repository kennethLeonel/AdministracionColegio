const path = require('path');
const fs = require('fs');


const funcionesArchivos = {

    leerArchivo: () => {

        const archivo = path.join(__dirname, '../db/archivoEmpleador.json');
        let contenido = fs.readFileSync(archivo, 'utf-8');
        return JSON.parse(contenido);
    }
}

module.exports = funcionesArchivos;