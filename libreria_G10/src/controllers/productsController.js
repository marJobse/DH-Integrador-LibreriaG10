const path = require('path');

const productsController = {
    detail: (req, res) => {
        res.render('productDetail')
    },
    edit: (req, res) => {
        res.render('productEdit')
    },
}

module.exports = productsController;