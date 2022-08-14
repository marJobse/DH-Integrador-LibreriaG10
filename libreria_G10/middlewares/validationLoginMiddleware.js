const { body } = require('express-validator');


const loginValidation = [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 8 }).withMessage('Contraseña de 8 caracteres como mínimo')

]

module.exports = loginValidation;
