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
        res.render('../views/products/productList.ejs', { products })
    },
    edit: (req, res) => {
        res.render('../views/products/productEdit.ejs')
    },
    delete: (req, res) => {
        res.render('../views/products/productConfirmacionEliminar.ejs')
    },
    verBase: (req, res) => {
        res.render('../views/products/all.ejs', { products })
    },
    create: (req, res) => {
        res.render('../views/products/product-create-form.ejs')
    },
    store: (req, res) => {
        const nuevoProd = {};
        nuevoProd.id = products.length + 1;
        nuevoProd.nombre = req.body.nombre;
        nuevoProd.resenia = req.body.resenia;
        nuevoProd.precio = req.body.precio;
        nuevoProd.clasificacion = req.body.clasificacion;
        nuevoProd.imagen = req.file.filename;
        nuevoProd.anioEdicion = req.body.anioEdicion;
        nuevoProd.fechaPublicacion = req.body.fechaPublicacion;
        nuevoProd.stock = req.body.stock;
        nuevoProd.autor = req.body.autor;
        nuevoProd.editorial = req.body.editorial;
        nuevoProd.nroPaginas = req.body.nroPaginas;
        nuevoProd.idioma = req.body.idioma;
        nuevoProd.isbn = req.body.isbn;
        products.push(nuevoProd);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));

        res.redirect('/');
    }
}

module.exports = productsController;