const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");



const productsAPIController = {
    'count': (req, res) => {
        db.Books.count()
        .then(resultado => {
            console.log(resultado)
            let respuesta = {
                meta:  {
                    status: 200,
                    url: '/api/books/count'
                },
                data: resultado
            }
            res.json(respuesta);
        })
    },
    'products': (req, res) => {
        let products = db.Books.findAll({
                            include: [
                                { association: 'editoriales' },
                                { association: 'autores' },
                                { association: 'generos' }]
                                })
        let generos = db.Genres.findAll()
        
        Promise.all([products, generos])
        .then(([products, generos]) => {
            let booksByGenres = {

            }
            generos.forEach(genero => {
                db.Books.findAll({
                    include: [
                        { model: db.Genres, as: 'generos' }],
                    where: {'$generos.nombre$': genero.nombre}
                })
                .then(e => { booksByGenres[genero.nombre] = e.length })
            })
            let respuesta = {
                meta: {
                    status : 200,
                    url: '/api/books/products'
                },
                data: {
                    count: products.length,
                    products: products,
                    booksByGenres: booksByGenres
                }
            }
                res.json(respuesta);
            })
    },
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
                        url: '/api/books/:id'
                    },
                    data: libro
                }
                res.json(respuesta);
            });
    },
    
}

module.exports = productsAPIController;