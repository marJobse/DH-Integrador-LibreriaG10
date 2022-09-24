const express = require("express");
const router = express.Router()
const languajesController = require("../controllers/languagesController")
const multer = require("multer");
const path = require('path');
var bodyParser = require('body-parser')


// Todos los productos (public)

router.get("/list", languajesController.list);
router.get("/detail/:id", languajesController.detail);
router.get("/add", languajesController.add);
router.post("/add", languajesController.create);
router.get("/delete/:id", languajesController.delete);
router.post("/delete/:id", languajesController.confirmDelete);

router.get("/edit/:id", languajesController.edit);
router.post("/update/:id", languajesController.update);



module.exports = router;