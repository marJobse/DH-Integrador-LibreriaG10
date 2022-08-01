const express = require("express");
const path = require('path');
const fs = require('fs');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
    register : (req, res) => {
        res.render('../views/users/register.ejs')
    },
    login : (req, res) => {
        res.render('../views/users/login.ejs')
    },
    crearUsuario : (req, res) => {
        nuevoUsuario = {};
        nuevoUsuario.id = users.length+1;
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