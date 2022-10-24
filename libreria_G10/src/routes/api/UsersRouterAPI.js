const express = require("express");
const router = express.Router()
const path = require('path');
var bodyParser = require('body-parser')
const authMiddleware = require('../../../middlewares/authMiddleware')
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const usersListController = require("../../controllers/api/usersControllerAPI");



router.get("/list", usersListController.listaUsuarios);
router.get("/:id", usersListController.usuario_id);


module.exports = router;