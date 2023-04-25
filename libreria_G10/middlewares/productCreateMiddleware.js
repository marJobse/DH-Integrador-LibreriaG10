const path = require('path')
const { check } = require('express-validator');


const productCreateValidator = [
    check('nombre').notEmpty().withMessage("Debes completar el nombre").bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    check('resenia').notEmpty().withMessage("Debes completar la reseña").bail()
        .isLength({ min: 20 }).withMessage('La reseña debe tener al menos 20 caracteres'),
    check('imagen').custom((value, { req }) => {  //validación custom
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];
        if(!req.params.id){
        if (!file) {
            throw new Error('Tienes que subir una imagen');
        }
        else {
            let fileExtension = path.extname(file.originalname)
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error('Las extensiones de archivo permitidas son ' + acceptedExtensions.join(','));
            }
        }}
        else if (file) {
            let fileExtension = path.extname(file.originalname)
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error('Las extensiones de archivo permitidas son ' + acceptedExtensions.join(','));
            }}
        return true
    }),
    check('autor').notEmpty().withMessage("Debes seleccionar un autor").bail(),
    check('clasificacion').notEmpty().withMessage("Debes seleccionar un género").bail(),
    check('editorial').notEmpty().withMessage("Debes seleccionar una editorial").bail(),

]
module.exports = productCreateValidator;