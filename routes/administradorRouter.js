const express = require ('express')
const router = express.Router()

const controladorAdmin = require ('../controllers/controladorAdmin')

router.get('/', controladorAdmin.vista);
router.get('/crear', controladorAdmin.vistaCrear);
router.get('/editar', controladorAdmin.vistaEditar)
module.exports = router