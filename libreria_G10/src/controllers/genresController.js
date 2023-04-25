const db = require('../database/models');
const Op = db.Sequelize.Op;
const { check, body, validationResult } = require('express-validator');
const express = require("express");

const genresController = {

    list: (req, res) => {
        db.Genres.findAll().then(function (genres) {
            res.render('../views/genres/genresList.ejs', { genres })
        })

    },
    detail: (req, res) => {

        db.Genres.findByPk(req.params.id).then(function (genre) {
            res.render('../views/genres/genresDetail.ejs', { genre });
        });
    },

    add: (req, res) => {
        res.render('../views/genres/genresAdd.ejs')
    },

    create: (req, res) => {
        console.log("***********************************" + req.body.nombre)
        db.Genres.create({
            nombre: req.body.nombre,

        }).then(function () {
            db.Genres.findAll().then(function (genres) {
                res.render('../views/genres/genresList.ejs', { genres })
            })
        })
    },
    edit: (req, res) => {
        db.Genres.findByPk(req.params.id).then(function (genre) {
            res.render('../views/genres/genresEdit.ejs', { Genre: genre });
        })

    },

    update: (req, res) => {
        db.Genres.update({
            nombre: req.body.nombre,
        }, {
            where: {
                id: req.params.id
            }
        }).then(function () {
            res.redirect("/genres/list")
        })
    },


    delete: (req, res) => {
        db.Genres.findByPk(req.params.id).then(function (genre) {
            res.render('../views/genres/genresDelete.ejs', { genre });
        });
    },

    confirmDelete: (req, res) => {

        db.Genres_Book.destroy({
            where: {
                genero_id: req.params.id
            }
        }).then(function () {
            db.Genres.destroy({
                where: {
                    id: req.params.id
                }
            })
        }).then(function () {
            db.Genres.findAll().then(function (genres) {
                res.render('../views/genres/genresList.ejs', { genres })
            })
        })
    }

}

module.exports = genresController;