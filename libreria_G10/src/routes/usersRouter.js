const express = require("express");
const router = express.Router()
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const usersController = require("../controllers/usersController")

router.get("/register", usersController.register);
router.get("/login", usersController.login);
router.post('/', urlencodedParser, usersController.crearUsuario);

module.exports = router;