const express = require("express");
const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



const cartController = {
    detail: (req, res) => {
        res.render('../views/products/productCart.ejs')
    },

}

module.exports = cartController;