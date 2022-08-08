const express = require("express");
const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    detail: (req, res) => {
        let productId = req.params.id;
        const productDetail = products.find( product => {
            return product.id == productId;
        })
        res.render('../views/products/productDetail.ejs', {productDetail: productDetail})
    },
    list: (req, res) => {
        res.render('../views/products/productList.ejs', { products })
    },
    edit: (req, res) => {
        let prodId = req.params.id;
        const prodToEdit = products.find( product => {
            return product.id == prodId
        })
        res.render('../views/products/productEdit.ejs', {prodToEdit : prodToEdit})
    },
    update: (req, res) => {
        // prepping the info 
        let productUpdates = req.body;
        let productId = req.params.id;
		const prodToEdit = products.find( product => product.id == productId);
        // updating product properties 
        prodToEdit.id = productId ;
        prodToEdit.nombre = productUpdates.nombre ;
        prodToEdit.resenia = productUpdates.resenia ;
        prodToEdit.precio = productUpdates.precio ;
        // prodToEdit.imagen =  req.file.filename ;
        prodToEdit.clasificacion = productUpdates.clasificacion ;
        prodToEdit.anioEdicion = productUpdates.anioEdicion ;
        prodToEdit.fechaPublicacion = productUpdates.fechaPublicacion ;
        prodToEdit.stock = productUpdates.stock ;
        prodToEdit.autor = productUpdates.autor ;
        prodToEdit.editorial = productUpdates.editorial ;
        prodToEdit.nroPaginas = productUpdates.nroPaginas ;
        prodToEdit.idioma = productUpdates.idioma ;
        prodToEdit.isbn = productUpdates.isbn ;
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/')

    },
    deleteview: (req, res) => {
        let productId = req.params.id;
        const productDelete = products.find( product => {
            return product.id == productId;
        })
        res.render('../views/products/productDelete.ejs', {productDelete: productDelete})
    },
    delete: (req, res) => {
        let productId = req.params.id;
        products.splice((productId - 1 ), 1);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/product/list')
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