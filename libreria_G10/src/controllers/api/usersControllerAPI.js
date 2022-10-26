const express = require("express");
const path = require('path');
const session = require('express-session');
let bcrypt = require("bcryptjs");
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


const userList = {

    listaUsuarios: async (req, res) => {

        db.Users.findAll().then(usuarios=>
            usuarios.map((u)=>
            {
                return ({"id": u.id, "nombre": u.nombre, "email": u.email, "detail": "http://localhost:3030/api/users/"+u.id})
            })) .then((usuarios) => {
                let respuesta = {
                    meta: {

                        status: 200,
                        count: usuarios.length,
                        url: "api/users/list" //endpoint
                    }, 
                    data: usuarios
                }
                res.json(respuesta);
            });
    },
    usuario_id: async (req, res) => {
        //res.send('hola usuario')
        db.Users.findByPk(req.params.id)
            .then(function (user) {
                let respuesta = {
                    meta: {
                        status: 200,
                        url: "api/users/:id" //endpoint
                    },
                    //  data: user
                    data: {
                        id: user.id,
                        nombre: user.nombre,
                        apellido: user.apellido,
                        domicilio: user.domicilio,
                        email: user.email,
                        idioma_id: user.idioma_id,
                        telefono: user.telefono,
                        imagen: 'http://localhost:3030/images/users/' + user.imagen,

                    }
                }
                res.json(respuesta);
            });
    }



}

module.exports = userList;

