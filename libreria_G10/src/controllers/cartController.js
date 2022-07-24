const express = require("express");
const path = require('path');

const cartController = {
    detail: (req, res) => {
        res.render('../views/products/productCart.ejs')
    },
}

module.exports = cartController;