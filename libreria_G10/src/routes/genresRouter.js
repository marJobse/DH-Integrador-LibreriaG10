const express = require("express");
const router = express.Router()
const genresController = require("../controllers/genresController")
const multer = require("multer");
const path = require('path');
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// Todos los productos (public)

router.get("/list", genresController.list);
router.get("/add", genresController.add);
router.post("/add", genresController.create);
router.get("/delete/:id", genresController.delete);
router.post("/delete/:id", genresController.confirmDelete);


module.exports = router;