const express = require("express");
const router = express.Router()
const productsController = require("../controllers/productsController")

router.get("/productDetail", productsController.detail);

module.exports = router;