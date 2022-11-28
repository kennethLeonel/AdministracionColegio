
const express = require ('express')
const router = express.Router()

const controladorIndex = require ('../controllers/controladorIndex')

router.get('/', controladorIndex.vista);
router.post('/', controladorIndex.realizarLogin);
router.get('/formularioEmpleado', controladorIndex.vistaEmpleado);
router.get('/logout', controladorIndex.cerrar);



module.exports = router