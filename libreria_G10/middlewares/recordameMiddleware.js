const path = require('path');
//const usersFilePath = path.join(__dirname, '../src/data/usersDataBase.json');
const { check, body, validationResult } = require('express-validator');
const session = require('express-session');
let bcrypt = require("bcryptjs");
const db = require('../src/database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const fs = require('fs');
function recordameMiddleware(req, res, next) {
    next();
    // if (req.cookies.recordame != undefined && req.session.usuarioLogueado == undefined) {
    //    let usersJSON = fs.readFileSync(usersFilePath, 'utf-8');
    //   let users;
    //   if (usersJSON == "") {
    //      users = [];
    //  }
    //  else {
    //     users = JSON.parse(usersJSON);
    // }
    // for (let i = 0; i < users.length; i++) {
    //     if (users[i].email == req.cookies.recordame) {
    //         usuarioALoguearse = users[i];
    //         break;
    //      }
    // //   }
    //    req.session.usuarioLogueado = usuarioALoguearse;
    //    }

    let encontrados;
    if (req.cookies.recordame != undefined && req.session.usuarioLogueado == undefined) {
        db.Users.findAll().then(function (usuarios) {
            encontrados = usuarios;
        }).then(function () {
            let usuarioALoguearse;
            for (let i = 0; i < encontrados.length; i++) {
                if (encontrados[i].email == req.cookies.recordame) {
                    usuarioALoguearse = encontrados[i];
                    break;
                }
            }
            req.session.usuarioLogueado = usuarioALoguearse;
            console.log("sesion", req.session.usuarioLogueado)
        })
    }

}
module.exports = recordameMiddleware;