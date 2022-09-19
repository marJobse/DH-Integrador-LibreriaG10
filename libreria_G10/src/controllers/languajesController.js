const db = require('../database/models');
const Op = db.Sequelize.Op;
const { check, body, validationResult } = require('express-validator');
const express = require("express");

const languajeController = {

    list: (req, res) => {
        db.Languages.findAll().then(function (languajes) {
            res.render('../views/languajes/languajesList.ejs', { languajes })
        })

    },
    detail: (req, res) => {

        db.Languajes.findByPk(req.params.id).then(function (languaje) {
            res.render('../views/languajes/languajesDetail.ejs', { languaje });
        });
    },

    add: (req, res) => {
        res.render('../views/languajes/languajesAdd.ejs')
    },

    create: (req, res) => {
        db.Languajes.create({
            nombre: req.body.nombre,

        }).then(function () {
            res.send(req.body.nombre)
        })
    },

    edit: (req, res) => {
        db.Languajes.findByPk(req.params.id).then(function (languaje) {
            res.render('../views/languajes/languajesEdit.ejs', { Languaje: languaje });
        })

    },

    update: (req, res) => {
        db.Languajes.update({
            nombre: req.body.nombre,
        }, {
            where: {
                id: req.params.id
            }
        }).then(function () {
            res.redirect("/languajes/list")
        })
    },

    delete: (req, res) => {
        db.Languajes.findByPk(req.params.id).then(function (languaje) {
            res.render('../views/languajes/languajesDelete.ejs', { languaje });
        });
    },

    confirmDelete: (req, res) => {

        db.Languajes_Book.destroy({
            where: {
                languaje_id: req.params.id
            }
        }).then(function () {
            db.Languajes.destroy({
                where: {
                    id: req.params.id
                }
            })
        }).then(function () {
            db.Languajes.findAll().then(function (languajes) {
                res.render('../views/languajes/languajesList.ejs', { languajes })
            })
        })
    }

}

module.exports = languajeController;

