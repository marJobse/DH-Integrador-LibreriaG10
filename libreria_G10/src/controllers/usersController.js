const express = require("express");
const path = require('path');
const fs = require('fs');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const bcrypt = require('bcrypt');
const session = require('express-session');
const { check, body, validationResult } = require('express-validator');


const usersController = {
    register: (req, res) => {
        res.render('../views/users/register.ejs')
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
    },

    login: (req, res) => {
        res.render('../views/users/login.ejs')
    },


    loginProcess: (req, res) => {
        let errors = validationResult(req);
        console.log(errors);
        if (errors.isEmpty()) {
            let usuarioALoguearse;
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == req.body.email) {
                    if (req.body.password, users[i].password) {
                        usuarioALoguearse = users[i];
                        console.log('lo encontro')
                        break;
                    }
                }
            }
            if (usuarioALoguearse == undefined) {
                return res.render('login', {
                    errors: [{ msg: 'Credenciales inválidas' }
                    ]
                });

            }
            req.session.usuarioLogueado = usuarioALoguearse;
            console.log(req.session.usuarioLogueado);
            res.send('sucess');
        }

        else {
            return res.render('../views/users/login.ejs', { errors: errors.errors });
        }
    }
}



module.exports = usersController