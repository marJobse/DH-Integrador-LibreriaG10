const express = require("express");
const router = express.Router()
const productsController = require("../controllers/productsController")
const multer = require("multer");
const path = require('path');
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get("/", productsController.detail);
router.get("/list", productsController.list);
router.get("/delete", productsController.delete);
router.get("/productDetail", productsController.detail);
router.get("/all", productsController.verBase);

/*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.create);

const multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => { // cb= callback
        let folder = path.join(__dirname, '../../public/images');
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
router.post("/edit/:id", urlencodedParser, productsController.update);



module.exports = router;