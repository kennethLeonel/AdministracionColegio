const express = require ('express')
const router = express.Router()

const controladorAdmin = require ('../controllers/controladorIndex')

router.get('/', controladorAdmin.vista);
router.post('/', controladorAdmin.realizarLogin);

module.exports = router