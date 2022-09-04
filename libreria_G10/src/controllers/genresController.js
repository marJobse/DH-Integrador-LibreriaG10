const db = require('../database/models');
const Op = db.Sequelize.Op;
const { check, body, validationResult } = require('express-validator');


const express = require("express");
const path = require('path');
const fs = require('fs');
const genresFilePath = path.join(__dirname, '../data/genresDataBase.json');/////////////////////
const genres = JSON.parse(fs.readFileSync(genresFilePath, 'utf-8'));

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
        // const nuevoGenero = {};
        //nuevoGenero.id = genres.length + 1;
        //nuevoGenero.nombre = req.body.nombre;


        db.Genres.create({
            nombre: req.body.nombre, // COMO PONERLE EL PRIMER ID, SALE NULL

        }).then(function () {
            // res.redirect("/movies")
            res.send(genres)
        })

        //genres.push(nuevoGenero);
        //fs.writeFileSync(genresFilePath, JSON.stringify(genres, null, ' '));

        //res.send(genres)
    }
}

module.exports = genresController;