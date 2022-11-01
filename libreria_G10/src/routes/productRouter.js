const express = require("express");
const router = express.Router()
const productsController = require("../controllers/productsController")
const multer = require("multer");
const path = require('path');
var bodyParser = require('body-parser')
const authMiddleware = require('../../middlewares/authMiddleware')
const adminMiddleware = require('../../middlewares/adminMiddleware')
const productCreateValidator = require('../../middlewares/productCreateMiddleware')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const { check, body, validationResult } = require('express-validator');
const productEditValidator = require("../../middlewares/productCreateMiddleware");

// Todos los productos (public)

router.get("/list", productsController.list);

// Todos los productos (admin)

router.get("/admin-list", adminMiddleware , productsController.adminList);

// Detalle producto
router.get("/detail/:id", productsController.detail);

// Eliminar producto
router.get("/delete/:id", adminMiddleware , productsController.deleteview);
router.post("/delete/:id", productsController.delete);

/*** CREATE ONE PRODUCT ***/
router.get('/create', adminMiddleware , productsController.create);

const multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => { // cb= callback
        let folder = path.join(__dirname, '../../public/images/products');
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        let imageName = 'img-' + Date.now() + '-' + (file.originalname);
        cb(null, imageName);
    }
})
const uploadFile = multer(({ storage: multerDiskStorage })); // multer es un middleware, para implementarlo se almacena en una variable la ejecucín

// queremos procesar este campo= image// single= una única imágen.
router.post('/', uploadFile.single('imagen'), productCreateValidator, productsController.store);

// EDITAR PRODUCTO 
router.get("/edit/:id", adminMiddleware , productsController.edit);
router.post("/edit/:id", productEditValidator, productsController.update);
router.get("/imageupdate/:id", productsController.imageUpdate);
router.post("/imageupdate/:id", uploadFile.single('imagen'), productsController.imageUpdateAction);




// Buscar producto
router.post("/search", productsController.search)



module.exports = router;