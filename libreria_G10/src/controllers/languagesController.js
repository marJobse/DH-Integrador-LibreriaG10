const db = require('../database/models');
const Op = db.Sequelize.Op;
const { check, body, validationResult } = require('express-validator');
const express = require("express");

const languageController = {

    list: (req, res) => {
        db.Languages.findAll().then(function (languages) {
            res.render('../views/languages/languagesList.ejs', { languages })
        })

    },
    detail: (req, res) => {

        db.Languages.findByPk(req.params.id).then(function (language) {
            res.render('../views/languages/languagesDetail.ejs', { language });
        });
    },

    add: (req, res) => {
        res.render('../views/languages/languagesAdd.ejs')
    },

    create: (req, res) => {
        db.Languages.create({
            nombre: req.body.nombre,

        }).then(function () {
            db.Languages.findAll().then(function (languages) {
                res.render('../views/languages/languagesList.ejs', { languages })
            })
        })
    },

    edit: (req, res) => {
        db.Languages.findByPk(req.params.id).then(function (language) {
            res.render('../views/languages/languagesEdit.ejs', { Language: language });
        })

    },

    update: (req, res) => {
        db.Languages.update({
            nombre: req.body.nombre,
        }, {
            where: {
                id: req.params.id
            }
        }).then(function () {
            res.redirect("/languages/list")
        })
    },

    delete: (req, res) => {
        db.Languages.findByPk(req.params.id).then(function (language) {
            res.render('../views/languages/languagesDelete.ejs', { language });
        });
    },

    confirmDelete: (req, res) => {
        db.Books.update({
            idioma_id: null
        }, {
            where: {
                idioma_id: req.params.id
            }
        }).then(function () {
            res.send("nulleado")

        })


    }


}

module.exports = languageController;
