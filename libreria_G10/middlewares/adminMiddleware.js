function adminMiddleware(req, res, next) {
    if (req.session.usuarioLogueado != undefined) {
        if(req.session.usuarioLogueado.tipo_id == 1){
        next()} else {
        res.send('Sólo para administradores')}
    }
    else {
        res.render('../views/users/login.ejs')
    }
}
module.exports = adminMiddleware;