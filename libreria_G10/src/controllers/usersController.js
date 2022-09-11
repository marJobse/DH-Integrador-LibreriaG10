const express = require("express");
const path = require('path');
const fs = require('fs');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const session = require('express-session');
const { check, body, validationResult } = require('express-validator');
let bcrypt = require("bcryptjs");


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
        nuevoUsuario.password = bcrypt.hashSync(req.body.password, 10)
        nuevoUsuario.tipo = "user"

        let validacion = bcrypt.compareSync(req.body.password, nuevoUsuario.password);
        console.log(validacion, 'esta fue la validacion')

        users.push(nuevoUsuario)
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));

        res.render('../views/users/profile.ejs', {user: nuevoUsuario})
    },

    login: (req, res) => {
        res.render('../views/users/login.ejs')
    },


    loginProcess: (req, res) => {
        let errors = validationResult(req);
        console.log(errors);
        if (errors.isEmpty()) {
            let usersJSON = fs.readFileSync(usersFilePath, 'utf-8');
            let users;
            if (usersJSON == "") {
                users = [];
            }
            else {
                users = JSON.parse(usersJSON);
            }
            let usuarioALoguearse;
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == req.body.email) {
                    if (bcrypt.compareSync(req.body.password, users[i].password)) {
                        usuarioALoguearse = users[i];
                        break;
                    }
                }
            }


            if (usuarioALoguearse == undefined) {
                return res.render('../views/users/login.ejs', {
                    errors: [{ msg: 'Credenciales inválidas' }
                    ]
                });

            }
            // parte que hace el loggin
            req.session.usuarioLogueado = usuarioALoguearse;

            // 60.000 mls= 60 seg
            if (req.body.recordame != undefined) {
                res.cookie('recordame', usuarioALoguearse.email, { maxAge: 600000 })
            }
            res.render('../views/users/profile.ejs', { user: req.session.usuarioLogueado})
        }
        else {
            return res.render('../views/users/login.ejs', { errors: errors.errors });
        }
    },
    profile: (req,res)=>{

        res.render('../views/users/profile.ejs', {user: req.session.usuarioLogueado})
    }

}

module.exports = usersController