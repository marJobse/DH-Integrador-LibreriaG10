const express = require("express");
const path = require('path');
const session = require('express-session');
const { validationResult } = require('express-validator');
let bcrypt = require("bcryptjs");
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { Console } = require("console");
const { promiseImpl } = require("ejs");


let avatar = 'images/users/avatar.png';


const usersController = {
    register: (req, res) => {
        res.render('../views/users/register.ejs')
    },
    store: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            db.Users.findAll().then(function (usuarios) {
                encontrados = usuarios;
            }).then(function () {
                let duplicado = false;
                for (let i = 0; i < encontrados.length; i++) {
                    if (encontrados[i].email == req.body.email) {
                        duplicado = true;
                        break;
                    }
                }
                if (!duplicado) {
                    let password = (req.body.password);
                    let confirmacion_password = (req.body.password2);
                    if (password == confirmacion_password) {
                        db.Users.create({
                            nombre: req.body.nombre,
                            apellido: req.body.apellido,
                            email: req.body.email,
                            domicilio: req.body.domicilio,
                            imagen: req.file.filename,
                            telefono: req.body.telefono,
                            password: bcrypt.hashSync(req.body.password, 10),
                            tipo_id: 2,
                        }).then((user) => {
                            console.log(user)
                            res.render('../views/users/profile.ejs', { user })
                        })
                    }
                    else {
                        return res.render('../views/users/register.ejs', {
                            errors: [{ msg: 'Las contraseñas no coinciden. Intente nuevamente' },
                            ]
                        });
                    }
                }
                else {
                    return res.render('../views/users/register.ejs', {
                        errors: [{ msg: 'El email ' + req.body.email + ' ya se encuentra registrado. Intente nuevamente' }
                        ]
                    });
                }
            })
        } else {
            return res.render('../views/users/register.ejs', { errors: errors.errors });
            // return res.render('../views/users/register.ejs',
            //   {
            //       errors: errors.mapped(),
            //      oldData: req.body
            // }
            //   );
            // return res.send(errors.mapped());
        }
    },
    login: (req, res) => {
        //  res.send('usuario logueado' + req.session.usuarioLogueado)
        if (req.session.usuarioLogueado) {
            res.render('../views/users/profile.ejs', { user: req.session.usuarioLogueado })
        } else {
            res.render('../views/users/login.ejs')
        }
    },
    loginProcess: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            db.Users.findAll().then(function (usuarios) {
                encontrados = usuarios;
            }).then(function () {
                let usuarioALoguearse;
                for (let i = 0; i < encontrados.length; i++) {
                    if (encontrados[i].email == req.body.email) {
                        if (bcrypt.compareSync(req.body.password, encontrados[i].password)) {
                            usuarioALoguearse = encontrados[i];
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
                delete usuarioALoguearse.password; //para no guardarla en la sesion
                req.session.usuarioLogueado = usuarioALoguearse;

                if (req.body.recordame != undefined) {
                    res.cookie('recordame', usuarioALoguearse.email, { maxAge: 600000 })
                }
            }).then(function () {
                res.render('../views/users/profile.ejs', { user: req.session.usuarioLogueado })

            })
        }
        else {
            return res.render('../views/users/login.ejs', { errors: errors.errors });
        }
    },
    edit: (req, res) => {
        db.Users.findByPk(req.params.id).then(function (user) {
            req.session.usuarioLogueado = user; // sino, cuando edito el usuario, el logueado es el primero sin cambios
            res.render('../views/users/userEdit.ejs', { user: req.session.usuarioLogueado });
        })
    },
    update: (req, res) => {
        db.Users.update({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            domicilio: req.body.domicilio,
            telefono: req.body.telefono,
        },
            { where: { id: req.params.id } })
            .then(function (user) {
                db.Users.findByPk(req.params.id).then(function (user) {
                    res.render('../views/users/profile.ejs', { user: user }) // el profile no agarra los datos pero se cambiaron
                })
            })
    },
    editImage: (req, res) => {
        db.Users.findByPk(req.params.id).then(function (user) {
            req.session.usuarioLogueado = user; // sino, cuando edito el usuario, el logueado es el primero sin cambios
            res.render('../views/users/editImage.ejs', { user: req.session.usuarioLogueado });
        })
    },
    updateImage: (req, res) => {
        db.Users.findByPk(req.params.id)
            .then((user) => {

                if (req.file != 'undefined') {
                    db.Users.update({ imagen: req.file.filename }, { where: { id: req.params.id } })
                }
                req.session.usuarioLogueado = user;
                res.render('../views/users/profile.ejs', { user: req.session.usuarioLogueado })

            })


    },
    deleteImage: (req, res) => {
        db.Users.findByPk(req.params.id).then(function (user) {
            req.session.usuarioLogueado = user; // sino, cuando edito el usuario, el logueado es el primero sin cambios
            res.render('../views/users/deleteImage.ejs', { user: req.session.usuarioLogueado });
        })
    },
    processDeleteImage: (req, res) => {
        db.Users.findByPk(req.params.id)
            .then((user) => {
                if (req.file != 'undefined') {
                    console.log(req.file)
                    db.Users.update({ imagen: 'img-1664762335619-avatar-lectura.jpg' }, { where: { id: req.params.id } })
                }
                req.session.usuarioLogueado = user;
                res.render('../views/users/profile.ejs', { user: req.session.usuarioLogueado })

            })


    },
    profile: (req, res) => {
        res.render('../views/users/profile.ejs', { user: req.session.usuarioLogueado })
    },
    logout: (req, res) => {
        res.clearCookie('recordame');
        req.session.destroy();
        res.render('../views/users/login.ejs')
    },

    //------------------------------API---------------------------------------------------------------------

    listaUsuarios: async (req, res) => {
        //res.send('hola lista')
        db.Users.findAll()
            .then(usuarios => {
                res.json({
                    meta: {
                        status: 200,
                        count: usuarios.length,
                        url: "api/users" //endpoint
                    },
                    data: usuarios

                });
            });
    },

    usuario_id: async (req, res) => {
        //res.send('hola usuario')
        db.Users.findByPk(req.params.id)
            .then(function (user) {
                res.json({
                    meta: {
                        status: 200,
                        url: "api/users/:id" //endpoint
                    },
                    data: user
                });
            });
    }

}

module.exports = usersController