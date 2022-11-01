const path = require('path')
const { check } = require('express-validator');


const productEditValidator = [
    check('nombre').notEmpty().withMessage("Debes completar el nombre").bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    check('resenia').notEmpty().withMessage("Debes completar la reseña").bail()
        .isLength({ min: 20 }).withMessage('La reseña debe tener al menos 20 caracteres'),
    check('autor').notEmpty().withMessage("Debes seleccionar un autor").bail(),
    check('clasificacion').notEmpty().withMessage("Debes seleccionar un género").bail(),
    check('editorial').notEmpty().withMessage("Debes seleccionar una editorial").bail(),

]
module.exports = productEditValidator;