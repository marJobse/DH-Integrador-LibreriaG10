const express = require("express");
const router = express.Router()
const productsController = require("../controllers/productsController")
const multer = require("multer");
const path = require('path');
var bodyParser = require('body-parser')
const authMiddleware = require('../../middlewares/authMiddleware')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// Todos los productos (public)

router.get("/list", productsController.list);

// Todos los productos (admin)

router.get("/admin-list", authMiddleware , productsController.adminList);

// Detalle producto
router.get("/detail/:id", productsController.detail);

// Eliminar producto
router.get("/delete/:id", productsController.deleteview);
router.post("/delete/:id", productsController.delete);

/*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.create);

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
router.post('/', uploadFile.single('imagen'), productsController.store);

// EDITAR PRODUCTO 
router.get("/edit/:id", productsController.edit);
router.post("/edit/:id", uploadFile.single('imagen'), productsController.update);

// Buscar producto
router.post("/search", productsController.search)



module.exports = router;