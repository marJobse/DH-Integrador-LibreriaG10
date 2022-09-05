const express = require("express");
const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db = require('../database/models');

const productsController = {
    detail: (req, res) => {
        db.Books.findByPk(req.params.id,{
            include: [{
                association: 'editoriales'
            },{
                association: 'autores'
            },{
                association: 'idiomas'
            },{
                association: 'generos'
            },
        ]
        })
        .then(libro=>{
            res.render('../views/products/productDetail.ejs', { productDetail: libro })
        })
    },
    list: (req, res)=>{
        db.Books.findAll({
            include: [{
                association: 'editoriales'
            },{
                association: 'autores'
            },
        ]
        })
        .then(products=>{
            console.log(products[1].autores[0])
            res.render('../views/products/productList.ejs', { products })
        })
    },
    adminList: (req, res) => {
        db.Books.findAll({
            include: [{
                association: 'editoriales'
            },{
                association: 'autores'
            },
        ]
        })
        .then(products=>{
            console.log(products[1].autores[0])
            res.render('../views/products/productListAdmin.ejs', { products })
        })
   },
    edit: (req, res) => {
        let allGenres = db.Genres.findAll()
        let idiomas = db.Languages.findAll()
        let allAuthors = db.Authors.findAll()
        let allEditorials =  db.Editorials.findAll()
        db.Books.findByPk(req.params.id,{
            include: [{
                association: 'editoriales'
            },{
                association: 'autores'
            },{
                association: 'idiomas'
            },{
                association: 'generos'
            },
        ]
        })
        .then(libro=>{
            res.render('../views/products/productEdit.ejs', { 
                prodToEdit: libro,
                generos: allGenres,
                autores: allAuthors,
                idiomas: idiomas,
                editoriales: allEditorials
            })
        })
    },
    
    update: (req, res) => {
        // prepping the info 
        let productUpdates = req.body;
        let productId = req.params.id;
        const prodToEdit = products.find(product => product.id == productId);
        // updating product properties 
        prodToEdit.id = productId;
        prodToEdit.nombre = productUpdates.nombre;
        prodToEdit.resenia = productUpdates.resenia;
        prodToEdit.precio = productUpdates.precio;
        prodToEdit.imagen = req.file.filename;
        prodToEdit.clasificacion = productUpdates.clasificacion;
        prodToEdit.anioEdicion = productUpdates.anioEdicion;
        prodToEdit.fechaPublicacion = productUpdates.fechaPublicacion;
        prodToEdit.stock = productUpdates.stock;
        prodToEdit.autor = productUpdates.autor;
        prodToEdit.editorial = productUpdates.editorial;
        prodToEdit.nroPaginas = productUpdates.nroPaginas;
        prodToEdit.idioma = productUpdates.idioma;
        prodToEdit.isbn = productUpdates.isbn;
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/product/admin-list')

    },
    deleteview: (req, res) => {
        let productId = req.params.id;
        const productDelete = products.find(product => {
            return product.id == productId;
        })
        res.render('../views/products/productDelete.ejs', { productDelete: productDelete })
    },
    delete: (req, res) => {
        let productId = req.params.id;
        products.splice((productId - 1), 1);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/product/admin-list')
    },
    create: (req, res) => {
        db.Languages.findAll()
        .then(idiomas=>{
            res.render('../views/products/product-create-form.ejs', {idiomas: idiomas})
        })
    },
    store: (req, res) => {
        db.Books.create({
            nombre :  req.body.nombre,
            resenia :  req.body.resenia,
            precio:  req.body.precio,
            imagen:  req.file.filename,
            anio_edicion:  req.body.anioEdicion,
            fecha_publicacion:  req.body.fechaPublicacion,
            stock:  req.body.stock,
            nro_paginas:  req.body.nroPaginas,
            idioma_id:  req.body.idioma_id,
            isbn:  req.body.isbn,})
            .then(()=>{res.redirect('/product/admin-list')})
    }
}

module.exports = productsController;