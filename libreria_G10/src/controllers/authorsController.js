const db = require('../database/models');
const Op = db.Sequelize.Op;
const { check, body, validationResult } = require('express-validator');
const express = require("express");

const authorsController = {

    list: (req, res) => {
        db.Authors.findAll().then(function (authors) {
            res.render('../views/authors/authorsList.ejs', { authors })
        })

    },
    detail: (req, res) => {

        db.Authors.findByPk(req.params.id).then(function (author) {
            res.render('../views/authors/authorsDetail.ejs', { author });
        });
    },

    add: (req, res) => {
        res.render('../views/authors/authorsAdd.ejs')
    },

    create: (req, res) => {
        db.Authors.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,

        }).then(function (author) {
            res.render('../views/authors/authorsDetail.ejs', { author });
        })
    },

    edit: (req, res) => {
        db.Authors.findByPk(req.params.id).then(function (author) {
            res.render('../views/authors/authorsEdit.ejs', { author: author });
        })

    },

    update: (req, res) => {
        db.Authors.update({
            nombre: req.body.nombre,
            apellido: req.body.apellido,

        }, {
            where: {
                id: req.params.id
            }
        }).then(function () {
            res.redirect("/authors/list")
        })
    },


    delete: (req, res) => {
        db.Authors.findByPk(req.params.id).then(function (author) {
            res.render('../views/authors/authorsDelete.ejs', { author });
        });
    },

    confirmDelete: (req, res) => {

        db.Authors_Book.destroy({
            where: {
                autor_id: req.params.id
            }
        }).then(function () {
            db.Authors.destroy({
                where: {
                    id: req.params.id
                }
            })
        }).then(function () {
            db.Authors.findAll().then(function (authors) {
                res.render('../views/authors/authorsList.ejs', { authors })
            })
        })
    }

}

module.exports = authorsController;