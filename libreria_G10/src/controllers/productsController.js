const express = require("express");
const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    detail: (req, res) => {
        res.render('../views/products/productDetail.ejs')
    },
    list: (req, res) => {
        res.render('../views/products/productList.ejs')
    },
    edit: (req, res) => {
        res.render('../views/products/productEdit.ejs')
    },
    delete: (req, res) => {
        res.render('../views/products/productConfirmacionEliminar.ejs')
    },
    verBase: (req, res) => {
        res.render('../views/products/all.ejs', { products })
    }
}

module.exports = productsController;