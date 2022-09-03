function authMiddleware(req, res, next) {
    if (req.session.usuarioLogueado != undefined) {
        next();
    }
    else {
        res.send('página solo para usuarios logueados')
    }
}
module.exports = authMiddleware;