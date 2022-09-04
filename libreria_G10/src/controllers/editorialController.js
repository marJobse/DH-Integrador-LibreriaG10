const db = require('../database/models');
const Op = db.Sequelize.Op;
const { check, body, validationResult } = require('express-validator');
const express = require("express");

const editorialController = {

    list: (req, res) => {
        db.Editorials.findAll().then(function (editorials) {
            res.render('../views/editorials/editorialsList.ejs', { editorials })
        })

    },
    detail: (req, res) => {

        db.Editorials.findByPk(req.params.id).then(function (editorial) {
            res.render('../views/editorials/editorialsDetail.ejs', { editorial });
        });
    },

    add: (req, res) => {
        res.render('../views/editorials/editorialsAdd.ejs')
    },

    create: (req, res) => {
        db.Editorials.create({
            nombre: req.body.nombre,

        }).then(function () {
            res.send(req.body.nombre)
        })
    },

    edit: (req, res) => {
        db.Editorials.findByPk(req.params.id).then(function (editorial) {
            res.render('../views/editorials/editorialsEdit.ejs', { Editorial: editorial });
        })

    },

    update: (req, res) => {
        db.Editorials.update({
            nombre: req.body.nombre,
        }, {
            where: {
                id: req.params.id
            }
        }).then(function () {
            res.redirect("/editorials/list")
        })
    },

    delete: (req, res) => {
        db.Editorials.findByPk(req.params.id).then(function (editorial) {
            res.render('../views/editorials/editorialsDelete.ejs', { editorial });
        });
    },

    confirmDelete: (req, res) => {

        db.Editorials_Book.destroy({
            where: {
                editorial_id: req.params.id
            }
        }).then(function () {
            db.Editorials.destroy({
                where: {
                    id: req.params.id
                }
            })
        }).then(function () {
            db.Editorials.findAll().then(function (editorials) {
                res.render('../views/editorials/editorialsList.ejs', { editorials })
            })
        })
    }

}

module.exports = editorialController;
