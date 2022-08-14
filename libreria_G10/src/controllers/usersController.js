const express = require("express");
const path = require('path');
const fs = require('fs');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const User = require('/models/User');

const usersController = {
    register: (req, res) => {
        res.render('../views/users/register.ejs')
    },

    // VERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
    // processRegister: (req, res) => {
    // const resultValidation = validationResult(req);
    //  if (resultValidation.error.length > 0) {
    //      return res.render('../views/users/register.ejs', { errors: resultValidation.mapped(), oldData: req.bod });
    //
    //   }
    //   User.create(req.body);
    //    return res.send('Validaciones exitosas');
    // },


    login: (req, res) => {
        res.render('../views/users/login.ejs')
    },
    crearUsuario: (req, res) => {
        nuevoUsuario = {};
        nuevoUsuario.id = users.length + 1;
        nuevoUsuario.nombre = req.body.nombre;
        nuevoUsuario.apellido = req.body.apellido;
        nuevoUsuario.email = req.body.email;
        nuevoUsuario.domicilio = req.body.domicilio
        nuevoUsuario.password = req.body.password
        nuevoUsuario.tipo = "user"

        users.push(nuevoUsuario)
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));

        res.redirect('/product/list')
    }
}

module.exports = usersController