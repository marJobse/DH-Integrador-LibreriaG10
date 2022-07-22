const express = require("express");
const router = express.Router()
const productsController = require("../controllers/productsController")

router.get("/", productsController.detail);
router.get("/list", productsController.list);
router.get("/edit", productsController.edit);

module.exports = router;