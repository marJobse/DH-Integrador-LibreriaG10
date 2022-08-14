const express = require("express");
const router = express.Router()
var bodyParser = require('body-parser')

const { check, body, validationResult } = require('express-validator');
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser

var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Validaciones
const validateCreateForm = [
    body('nombre').notEmpty().withMessage('Debes completar el campo de nombre'),
    body('apellido').notEmpty().withMessage('Debes completar el campo de apellido'),
    body('domicilio').notEmpty().withMessage('Debes completar el campo de domicilio'),
    body('email').isEmail().withMessage('Debes completar con un email válido'),
    body('password').notEmpty().withMessage('Debes completar el campo de password'),
    body('password1').notEmpty().withMessage('Debes completar el campo de confirmar password'),

]

const usersController = require("../controllers/usersController");
const loginValidation = require("../../middlewares/validationLoginMiddleware");

router.get("/register", usersController.register);
router.post('/', urlencodedParser, usersController.crearUsuario);

//formulario login
router.get("/login", usersController.login);
//procesa formulario login
router.post("/login", loginValidation, usersController.loginProcess);



module.exports = router;