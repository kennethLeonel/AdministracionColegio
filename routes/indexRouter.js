
const express = require ('express')
const router = express.Router()

const controladorIndex = require ('../controllers/controladorIndex')

router.get('/', controladorIndex.vista);
router.post('/', controladorIndex.realizarLogin);
router.get('/formularioEmpleado', controladorIndex.vistaEmpleado);
//post
router.post('/formularioEmpleado', controladorIndex.datosFormulario);
router.get('/logout', controladorIndex.cerrar);
router.get('/home', controladorIndex.vistaHome);
router.get('/estadisticaMensual', controladorIndex.vistaMensual);



module.exports = router