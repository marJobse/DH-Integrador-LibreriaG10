function authMiddleware(req, res, next) {
    if (req.session.usuarioLogueado != undefined) {
        next();
    }
    else {
        res.render('../views/users/login.ejs')
    }
}
module.exports = authMiddleware;