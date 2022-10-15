const db = require('../src/database/models');

function recordameMiddleware(req, res, next) {

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
            let usuarioALoguearse

            for (let i = 0; i < encontrados.length; i++) {
                if (encontrados[i].email == req.cookies.recordame) {
                    usuarioALoguearse = encontrados[i];
                    break;
                }
            }
            req.session.usuarioLogueado = usuarioALoguearse;

            console.log('logueadooooooo ' + req.session.usuarioLogueado)
        })
    }
    next();

}
module.exports = recordameMiddleware;