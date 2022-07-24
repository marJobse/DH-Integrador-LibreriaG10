const path = require('path');

const productsController = {
    detail: (req, res) => {
        res.render('../views/products/productDetail.ejs')
    },
    list: (req, res) => {
        res.render('../views/products/productList.ejs')
    },
    edit: (req, res) => {
        res.render('../views/products/productEdit.ejs')
    },
    delete: (req, res) => {
        res.render('../views/products/productConfirmacionEliminar.ejs')
    },
}

module.exports = productsController;