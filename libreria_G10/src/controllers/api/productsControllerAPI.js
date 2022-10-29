const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");



const productsAPIController = {
    // 'count': (req, res) => {
    //     db.Books.count()
    //     .then(resultado => {
    //         console.log(resultado)
    //         let respuesta = {
    //             meta:  {
    //                 status: 200,
    //                 url: '/api/books/count'
    //             },
    //             data: resultado
    //         }
    //         res.json(respuesta);
    //     })
    // },
    'products': (req, res) => {
        let products = db.Books.findAll({
            include: [
                { association: 'editoriales' },
                { association: 'autores' },
                { association: 'generos' }],
            })
        let generos = db.Genres.findAll()
        let booksByGenres = {}
        let booksArray = []
        
        Promise.all([products, generos])
        .then(([products, generos]) => {
            products.map(product => {
                booksArray.push({ "id":product.id, "name":product.nombre, "resenia":product.resenia, "autores":product.autores, "categories":product.generos, "detail": "http://localhost:3030/product/detail/"+product.id })
            })
            generos.forEach(genero => {
                const filteredBooks = products.filter(product => product.generos[0].nombre == genero.nombre )
                let currentGenero = genero.nombre
                booksByGenres[currentGenero] = filteredBooks.length
            })
            let respuesta = {
                meta: {
                    status : 200,
                    url: '/api/books/products'
                },
                data: {
                    count: products.length,
                    booksByGenres: booksByGenres,
                    products: booksArray,
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
                libro.dataValues.imagenURL = "http://localhost:3030/images/products/"+libro.imagen
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