const { body } = require('express-validator');


const loginValidation = [
    body('email').trim().isEmail().withMessage('Email inválido'),
    body('password').trim().isLength({ min: 8 }).withMessage('Contraseña de 8 caracteres como mínimo')

]

module.exports = loginValidation;
