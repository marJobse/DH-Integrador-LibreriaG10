const db = require('../database/models');

const mainController = {
    home: (req, res) => {
        console.log(req.session.usuarioLogueado)
        db.Books.findAll({
            include: [
                { association: 'editoriales' },
                { association: 'autores' }]
        })
            .then(products => {
                res.render('../views/index.ejs', { products, user: req.session.usuarioLogueado })


            })
    },
}

module.exports = mainController;