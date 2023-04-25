const db = require('../src/database/models');

function recordameMiddleware(req, res, next) {
    res.locals.log = false;
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
            if (req.session && req.session.usuarioLogueado) {
                res.locals.log = true;
                res.locals.user = req.session.usuarioLogueado;
                console.log(res.locals.user)
            }
        })
    }
    next();

}
module.exports = recordameMiddleware;