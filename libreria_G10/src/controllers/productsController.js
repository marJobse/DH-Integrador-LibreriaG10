const express = require("express");
const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const productsController = {

    detail: (req, res) => {
        db.Books.findByPk(req.params.id,{
            include: [
                {association: 'editoriales'},
                {association: 'autores'},
                {association: 'idiomas'},
                {association: 'generos'}]
        })
        .then(libro=>{
            res.render('../views/products/productDetail.ejs', { productDetail: libro })
        })
    },
    list: (req, res)=>{
        db.Books.findAll({
            include: [
                {association: 'editoriales'},
                {association: 'autores'}]
        })
        .then(products=>{
            res.render('../views/products/productList.ejs', { products })
        })
    },
    adminList: (req, res) => {
        db.Books.findAll({
            include: [
                {association: 'editoriales'},
                {association: 'autores'}]
        })
        .then(products=>{
            res.render('../views/products/productListAdmin.ejs', { products })
        })
   },
    edit: (req, res) => {
        let generos = db.Genres.findAll()
        let idiomas = db.Languages.findAll()
        let autores = db.Authors.findAll()
        let editoriales =  db.Editorials.findAll()
        let libro = db.Books.findByPk(req.params.id,{
            include: [
                {association: 'editoriales'},
                {association: 'autores'},
                {association: 'idiomas'},
                {association: 'generos'}]
        })
        Promise.all([generos, idiomas, autores, editoriales, libro])
        .then(([generos, idiomas, autores, editoriales, libro])=>{
            res.render('../views/products/productEdit.ejs', { 
                prodToEdit: libro,
                generos: generos,
                autores: autores,
                idiomas: idiomas,
                editoriales: editoriales
            })
        })
    },
    
    // update: (req, res) => {
    //     // prepping the info 
    //     let productUpdates = req.body;
    //     let productId = req.params.id;
    //     const prodToEdit = products.find(product => product.id == productId);
    //     // updating product properties 
    //     prodToEdit.id = productId;
    //     prodToEdit.nombre = productUpdates.nombre;
    //     prodToEdit.resenia = productUpdates.resenia;
    //     prodToEdit.precio = productUpdates.precio;
    //     prodToEdit.imagen = req.file.filename;
    //     prodToEdit.clasificacion = productUpdates.clasificacion;
    //     prodToEdit.anioEdicion = productUpdates.anioEdicion;
    //     prodToEdit.fechaPublicacion = productUpdates.fechaPublicacion;
    //     prodToEdit.stock = productUpdates.stock;
    //     prodToEdit.autor = productUpdates.autor;
    //     prodToEdit.editorial = productUpdates.editorial;
    //     prodToEdit.nroPaginas = productUpdates.nroPaginas;
    //     prodToEdit.idioma = productUpdates.idioma;
    //     prodToEdit.isbn = productUpdates.isbn;
    //     fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
    //     res.redirect('/product/admin-list')

    // },
    update: (req,res)=> {
        db.Books.update({
            nombre :  req.body.nombre,
            resenia :  req.body.resenia,
            precio:  req.body.precio,
            imagen:  req.file.filename,
            anio_edicion:  req.body.anioEdicion,
            fecha_publicacion:  req.body.fechaPublicacion,
            stock:  req.body.stock,
            nro_paginas:  req.body.nroPaginas,
            idioma_id:  req.body.idioma,
            isbn:  req.body.isbn
        },
        { where: {id: req.params.id}})
        .then(()=>{
            res.redirect('/product/admin-list')
        })
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
        // db.Languages.findAll()
        // .then(idiomas=>{
        //     res.render('../views/products/product-create-form.ejs', {idiomas: idiomas})
        // })
        let generos = db.Genres.findAll()
        let idiomas = db.Languages.findAll()
        let autores = db.Authors.findAll()
        let editoriales =  db.Editorials.findAll()
        Promise.all([generos, idiomas, autores, editoriales])
        .then(([generos, idiomas, autores, editoriales])=>{
            res.render('../views/products/product-create-form.ejs', { 
                generos: generos,
                autores: autores,
                idiomas: idiomas,
                editoriales: editoriales
            })
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
    },
    search: (req, res)=>{
        let separador = /\s/;
        let searchTerm = req.body.busqueda
        let forQuery = req.body.busqueda.replace(/\+/g,' ')
        console.log(searchTerm)
        db.Books.findAll(
            {
                where: { 
                    nombre: {[Op.like]: `%${searchTerm}%`}  
                },
                include: [
                        {association: 'editoriales'},
                        {association: 'autores'}]
            }).then(products => {
                    res.render('../views/products/productResults.ejs', {products})
                }
            );
    }
}

module.exports = productsController;