const express = require("express");
const router = express.Router()
const editorialsController = require("../controllers/editorialController")
const multer = require("multer");
const path = require('path');
var bodyParser = require('body-parser')
const adminMiddleware = require('../../middlewares/adminMiddleware')


// Todos los productos (public)

router.get("/list", adminMiddleware, editorialsController.list);
// router.get("/detail/:id", editorialsController.detail);
router.get("/add", adminMiddleware, editorialsController.add);
router.post("/add", editorialsController.create);
router.get("/delete/:id", adminMiddleware, editorialsController.delete);
router.post("/delete/:id", editorialsController.confirmDelete);
router.get("/edit/:id", adminMiddleware, editorialsController.edit);
router.post("/update/:id", editorialsController.update);


module.exports = router;