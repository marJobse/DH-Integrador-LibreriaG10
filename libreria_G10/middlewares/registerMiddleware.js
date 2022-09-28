const { body } = require('express-validator');


const registerValidation = [

    body('nombre').notEmpty().withMessage("Debes completar el nombre").bail()
        .isLength({ min: 2 }).withMessage('El nombre debe ser mas largo'),

    body('apellido').notEmpty().withMessage("Debes completar el apellido").bail()
        .isLength({ min: 2 }).withMessage('El apellido debe ser mas largo'),


    body('domicilio').notEmpty().withMessage("Debes completar el domicilio").bail()
        .isLength({ min: 8 }).withMessage('Contraseña de 8 caracteres como mínimo'),


    body('telefono').notEmpty().withMessage("Debes completar el telefono").bail()
        .isLength({ min: 8 }).withMessage('Contraseña de 8 caracteres como mínimo'),


    body('email').notEmpty().withMessage("Debes completar el email").bail()
        .isEmail().withMessage('Email inválido'),

    body('password').notEmpty().withMessage("Debes completar la contraseña").bail()
        .isLength({ min: 8 }).withMessage('Contraseña de 8 caracteres como mínimo'),

    body('password1').notEmpty().withMessage("Debes completar la confirmación de la contraseña").bail()
        .isLength({ min: 8 }).withMessage('Contraseña de 8 caracteres como mínimo')



]

module.exports = registerValidation;
