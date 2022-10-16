const express = require("express");
const router = express.Router()
const path = require('path');
var bodyParser = require('body-parser')
const authMiddleware = require('../../middlewares/authMiddleware')
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const usersController = require("../controllers/usersController");


router.get("/", usersController.listaUsuarios);
router.get("/:id", usersController.usuario_id);


module.exports = router;