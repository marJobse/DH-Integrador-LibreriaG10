const express = require("express");
const router = express.Router()
const productsController = require("../controllers/productsController")

router.get("/", productsController.detail);
router.get("/list", productsController.list);
router.get("/edit", productsController.edit);
router.get("/delete", productsController.delete);
router.get("/productDetail", productsController.detail);
router.get("/all", productsController.verBase);


module.exports = router;