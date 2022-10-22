const express = require('express');
const router = express.Router();
const productsControllerAPI = require('../../controllers/api/productsControllerAPI');

//Rutas
//Listado de libros
router.get('/', productsControllerAPI.list);
// detalle de libro
router.get('/:id', productsControllerAPI.detail);


module.exports = router;