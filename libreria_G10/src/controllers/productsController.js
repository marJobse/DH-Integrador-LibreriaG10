const express = require("express");
const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { brotliDecompress } = require("zlib");

const productsController = {

    detail: (req, res) => {
        db.Books.findByPk(req.params.id, {
            include: [
                { association: 'editoriales' },
                { association: 'autores' },
                { association: 'idiomas' },
                { association: 'generos' }]
        })
            .then(libro => {
                res.render('../views/products/productDetail.ejs', { productDetail: libro })
            })
    },
    list: (req, res) => {
        db.Books.findAll({
            include: [
                { association: 'editoriales' },
                { association: 'autores' }]
        })
            .then(products => {
                res.render('../views/products/productList.ejs', { products })
            })
    },
    adminList: (req, res) => {
        db.Books.findAll({
            include: [
                { association: 'editoriales' },
                { association: 'autores' }]
        })
            .then(products => {
                res.render('../views/products/productListAdmin.ejs', { products })
            })
    },
    edit: (req, res) => {
        let generos = db.Genres.findAll()
        let idiomas = db.Languages.findAll()
        let autores = db.Authors.findAll()
        let editoriales = db.Editorials.findAll()
        let libro = db.Books.findByPk(req.params.id, {
            include: [
                { association: 'editoriales' },
                { association: 'autores' },
                { association: 'idiomas' },
                { association: 'generos' }]
        })
        Promise.all([generos, idiomas, autores, editoriales, libro])
            .then(([generos, idiomas, autores, editoriales, libro]) => {
                res.render('../views/products/productEdit.ejs', {
                    prodToEdit: libro,
                    generos: generos,
                    autores: autores,
                    idiomas: idiomas,
                    editoriales: editoriales
                })
            })
    },
    update: (req, res) => {
        db.Books.update({
            nombre: req.body.nombre,
            resenia: req.body.resenia,
            precio: req.body.precio,
            anio_edicion: req.body.anioEdicion,
            fecha_publicacion: req.body.fechaPublicacion,
            stock: req.body.stock,
            nro_paginas: req.body.nroPaginas,
            idioma_id: req.body.idioma,
            isbn: req.body.isbn
        },
            { where: { id: req.params.id } })
            .then(() => {
                if (req.file != 'undefined') {
                    db.Books.update({ imagen: req.file.filename }, { where: { id: req.params.id } })
                };
                db.Genres_Book.update(
                    { genero_id: req.body.clasificacion },
                    { where: { libro_id: req.params.id } }
                );
                db.Editorials_Book.update(
                    { editorial_id: req.body.editorial },
                    { where: { libro_id: req.params.id } }
                );
                db.Authors_Book.update(
                    { autor_id: req.body.autor },
                    { where: { libro_id: req.params.id } }
                )
            })
            .then(() => {
                res.redirect('/product/admin-list')
            })
    },
    deleteview: (req, res) => {
        db.Books.findByPk(req.params.id)
            .then(libro => {
                res.render('../views/products/productDelete.ejs', { productDelete: libro })
            })
    },
    delete: (req, res) => {
        let generos = db.Genres_Book.destroy({
            where: { libro_id: req.params.id }
        });
        let editoriales = db.Editorials_Book.destroy({
            where: { libro_id: req.params.id }
        });
        let autores = db.Authors_Book.destroy({
            where: { libro_id: req.params.id }
        });
        Promise.all([generos, editoriales, autores])
            .then(() => {
                db.Books.destroy({
                    where: { id: req.params.id }
                })
                    .then(() => {
                        res.redirect('/product/admin-list')
                    })
            })
    },
    create: (req, res) => {
        let generos = db.Genres.findAll()
        let idiomas = db.Languages.findAll()
        let autores = db.Authors.findAll()
        let editoriales = db.Editorials.findAll()
        Promise.all([generos, idiomas, autores, editoriales])
            .then(([generos, idiomas, autores, editoriales]) => {
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
            nombre: req.body.nombre,
            resenia: req.body.resenia,
            precio: req.body.precio,
            imagen: req.file.filename,
            anio_edicion: req.body.anioEdicion,
            fecha_publicacion: req.body.fechaPublicacion,
            stock: req.body.stock,
            nro_paginas: req.body.nroPaginas,
            idioma_id: req.body.idioma_id,
            isbn: req.body.isbn,
        }).then(newBook => {
            db.Genres_Book.create({
                libro_id: newBook.id,
                genero_id: req.body.clasificacion
            }),
                db.Editorials_Book.create({
                    libro_id: newBook.id,
                    editorial_id: req.body.editorial
                }),
                db.Authors_Book.create({
                    libro_id: newBook.id,
                    autor_id: req.body.autor
                })
        }).then((resultado) => {
            console.log(resultado)
            res.redirect('/product/admin-list')
        })
    },
    search: (req, res) => {
        let separador = /\s/;
        let searchTerm = req.body.busqueda
        let forQuery = req.body.busqueda.replace(/\+/g, ' ')
        console.log(forQuery)
        db.Books.findAll(
            {
                include: [
                    { model: db.Editorials, as: 'editoriales' },
                    { model: db.Authors, as: 'autores' }],
                where: {
                    [Op.or]: [
                        { nombre: { [Op.like]: `%${searchTerm}%` } },
                        { resenia: { [Op.like]: `%${searchTerm}%` } },
                        { '$autores.apellido$': { [Op.like]: `%${searchTerm}%` } },
                        { '$autores.nombre$': { [Op.like]: `%${searchTerm}%` } },

                        { '$editoriales.nombre$': { [Op.like]: `%${searchTerm}%` } }

                        // { [autores.apellido]: {[Op.like]: `%${searchTerm}%`} },
                    ]

                }
            }).then(products => {
                res.render('../views/products/productResults.ejs', { products })
            }
            );
    }
}

module.exports = productsController;