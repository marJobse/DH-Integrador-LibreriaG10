const path = require('path');

const productsController = {
    detail: (req, res) => {
        res.render('productDetail')
    },
    list: (req, res) => {
        res.render('productList')
    },
}

module.exports = productsController;