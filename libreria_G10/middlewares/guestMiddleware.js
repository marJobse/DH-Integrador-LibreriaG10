function guestMiddleware(req, res, next) {
    if (req.session.usuarioLogueado == undefined) {
        next();
    }
    else {
        res.send('página solo para invitados')
    }
}
module.exports = guestMiddleware;