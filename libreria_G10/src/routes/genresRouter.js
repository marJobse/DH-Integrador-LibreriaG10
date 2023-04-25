const express = require("express");
const router = express.Router()
const genresController = require("../controllers/genresController")
const multer = require("multer");
const path = require('path');
var bodyParser = require('body-parser')
const adminMiddleware = require('../../middlewares/adminMiddleware')


var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// Todos los productos (public)

router.get("/list", adminMiddleware, genresController.list);
router.get("/detail/:id", genresController.detail);
router.get("/add", adminMiddleware, genresController.add);
router.post("/add", genresController.create);
router.get("/delete/:id", adminMiddleware, genresController.delete);
router.post("/delete/:id", genresController.confirmDelete);
router.get("/edit/:id", adminMiddleware, genresController.edit);
router.post("/update/:id", genresController.update);


module.exports = router;