const express = require("express");
const router = express.Router()
const authorsController = require("../controllers/authorsController")
const multer = require("multer");
const path = require('path');
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// Todos los productos (public)

router.get("/list", authorsController.list);
router.get("/detail/:id", authorsController.detail);
router.get("/add", authorsController.add);
router.post("/add", authorsController.create);
router.get("/delete/:id", authorsController.delete);
router.post("/delete/:id", authorsController.confirmDelete);
router.get("/edit/:id", authorsController.edit);
router.post("/update/:id", authorsController.update);


module.exports = router;