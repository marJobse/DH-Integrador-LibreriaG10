const express = require("express");
const router = express.Router()
const authorsController = require("../controllers/authorsController")
const multer = require("multer");
const path = require('path');
var bodyParser = require('body-parser')
const adminMiddleware = require('../../middlewares/adminMiddleware')

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// Todos los productos (public)

router.get("/list", adminMiddleware, authorsController.list);
router.get("/detail/:id", adminMiddleware, authorsController.detail);
router.get("/add", adminMiddleware, authorsController.add);
router.post("/add", authorsController.create);
router.get("/delete/:id", adminMiddleware, authorsController.delete);
router.post("/delete/:id", authorsController.confirmDelete);
router.get("/edit/:id", adminMiddleware, authorsController.edit);
router.post("/update/:id", authorsController.update);


module.exports = router;