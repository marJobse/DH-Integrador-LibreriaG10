const path = require('path');

const productsController = {
    detail: (req, res) => {
        res.render('productDetail')
    },
    list: (req, res) => {
        res.render('productList')
    edit: (req, res) => {
        res.render('productEdit')
    },
}

module.exports = productsController;