const express = require('express');
const discountsAPIController = require('../../controllers/api/discountsControllerAPI');
const router = express.Router();

//Rutas
//Busqueda de descuento
router.get('/:id', discountsAPIController.search);



module.exports = router;