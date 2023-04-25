function guestMiddleware(req, res, next) {
    if (req.session.usuarioLogueado == undefined) {
        next();
    }
    else {
        res.render('../views/users/profile.ejs', { user: req.session.usuarioLogueado })
    }
}
module.exports = guestMiddleware;