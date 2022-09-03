const path = require('path');
const usersFilePath = path.join(__dirname, '../src/data/usersDataBase.json');
const { check, body, validationResult } = require('express-validator');
const session = require('express-session');

const fs = require('fs');
function recordameMiddleware(req, res, next) {
    next();
    if (req.cookies.recordame != undefined && req.session.usuarioLogueado == undefined) {
        let usersJSON = fs.readFileSync(usersFilePath, 'utf-8');
        let users;
        if (usersJSON == "") {
            users = [];
        }
        else {
            users = JSON.parse(usersJSON);
        }
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == req.cookies.recordame) {
                usuarioALoguearse = users[i];
                break;
            }
        }
        req.session.usuarioLogueado = usuarioALoguearse;
    }
}
module.exports = recordameMiddleware;