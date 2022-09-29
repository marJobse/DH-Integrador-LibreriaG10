const path = require('path')
const { body } = require('express-validator');
const registerValidation = [
    body('nombre').notEmpty().withMessage("Debes completar el nombre").bail()
        .isLength({ min: 2 }).withMessage('El nombre debe ser mas largo'),
    body('apellido').notEmpty().withMessage("Debes completar el apellido").bail()
        .isLength({ min: 2 }).withMessage('El apellido debe ser mas largo'),
    body('domicilio').notEmpty().withMessage("Debes completar el domicilio").bail()
        .isLength({ min: 8 }).withMessage('El domicilio debe ser mas largo'),
    body('telefono').notEmpty().withMessage("Debes completar el telefono").bail()
        .isLength({ min: 8 }).withMessage('El teléfono debe ser mas largo'),
    body('email').notEmpty().withMessage("Debes completar el email").bail()
        .isEmail().withMessage('Debes completar un formato de correo válido '),
    body('password').notEmpty().withMessage("Debes completar la contraseña").bail()
        .isLength({ min: 8 }).withMessage('Contraseña de 8 caracteres como mínimo'),
    body('password2').notEmpty().withMessage("Debes completar la confirmación de la contraseña").bail()
        .isLength({ min: 8 }).withMessage('Contraseña de 8 caracteres como mínimo'),
    body('imagen').custom((value, { req }) => {  //validación custom
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
        if (!file) {
            throw new Error('Tienes que subir una imagen');
        }
        else {
            let fileExtension = path.extname(file.originalname)
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error('Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}');
            }
        }
        return true
    })
]
module.exports = registerValidation;