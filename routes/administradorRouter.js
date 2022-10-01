const express = require ('express')
const router = express.Router()

const controladorAdmin = require ('../controllers/controladorAdmin')

router.get('/', controladorAdmin.vista);

module.exports = router