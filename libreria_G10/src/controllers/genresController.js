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

    add: (req, res) => {
        res.render('../views/genres/genresAdd.ejs')
    },

    create: (req, res) => {
        db.Genres.create({
            nombre: req.body.nombre,

        }).then(function () {
            res.send(req.body.nombre)
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