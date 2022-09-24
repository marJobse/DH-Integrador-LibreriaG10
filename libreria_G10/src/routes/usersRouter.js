const express = require("express");
const router = express.Router()
var bodyParser = require('body-parser')
const multer = require("multer");
const path = require('path');

const { check, body, validationResult } = require('express-validator');
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser

var urlencodedParser = bodyParser.urlencoded({ extended: false })

// multer
const multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => { // cb= callback
        let folder = path.join(__dirname, '../../public/images/users');
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        let imageName = 'img-' + Date.now() + '-' + (file.originalname);
        cb(null, imageName);
    }
})

const uploadFile = multer(({ storage: multerDiskStorage })); // multer es un middleware, para implementarlo se almacena en una variable la ejecucín

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
const guestMiddleware = require("../../middlewares/guestMiddleware.js");
const authMiddleware = require("../../middlewares/authMiddleware.js");


router.get("/register", guestMiddleware, usersController.register);
router.post('/', uploadFile.single('imagen'), usersController.store);

//formulario login
router.get("/login", guestMiddleware, usersController.login);

//procesa formulario login
router.post("/login", loginValidation, usersController.loginProcess);
router.get('/pruebaSession', (req, res) => {
    if (req.session.numeroVisitas == undefined) {
        req.session.numeroVisitas = 0;
    }
    req.session.numeroVisitas++;
    res.send('session tiene el numero: ' + req.session.numeroVisitas);

});
router.get('/check', function (req, res) {
    if (req.session.usuarioLogueado == undefined) {
        res.send('no logueado')
    }
    else {
        res.send('el usuario logueado es ' + req.session.usuarioLogueado.email)
    }
});
router.get("/profile", authMiddleware, usersController.profile); //le agregue auth
router.get("/edit/:id", usersController.edit);
router.post("/update/:id", usersController.update);
router.get("/logout", usersController.logout);


module.exports = router;