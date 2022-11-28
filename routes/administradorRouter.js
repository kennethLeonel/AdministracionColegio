const express = require ('express')
const router = express.Router()

const controladorAdmin = require ('../controllers/controladorAdmin')

router.get('/', controladorAdmin.vista);
router.get('/crear/', controladorAdmin.vistaCrear);
router.post ('/crearEmpleado', controladorAdmin.crearEmpleado);
router.get('/editar/:id', controladorAdmin.vistaEditar);
router.put('/editar/:id', controladorAdmin.editarEmpleado);
router.delete('/eliminar/:id', controladorAdmin.eliminarEmpleado)
module.exports = router