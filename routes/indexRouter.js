const express = require ('express')
const router = express.Router()

const controladorAdmin = require ('../controllers/controladorIndex')

router.get('/', controladorAdmin.vista);
router.post('/', controladorAdmin.realizarLogin);
router.get('/formularioEmpleado', controladorAdmin.vistaEmpleado);
router.get('/logout', controladorAdmin.cerrar);

module.exports = router