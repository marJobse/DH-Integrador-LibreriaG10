const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");



const productsAPIController = {
    'list': (req, res) => {
               db.Books.findAll({
            include: [
                { association: 'editoriales' },
                { association: 'autores' }]
        })
        .then(books => {
            let respuesta = {
                meta: {
                    status : 200,
                    total: books.length,
                    url: 'api/books'
                },
                data: books
            }
                res.json(respuesta);
            })
    },
    'detail': (req, res) => {
        db.Books.findByPk(req.params.id, {
            include: [
                { association: 'editoriales' },
                { association: 'autores' },
                { association: 'idiomas' },
                { association: 'generos' }]
        })
            .then(libro => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: libro.length,
                        url: '/api/books/:id'
                    },
                    data: libro
                }
                res.json(respuesta);
            });
    },
    
}

module.exports = productsAPIController;