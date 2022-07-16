const express = require("express");
const path = require('path');

const cartController = {
    detail: (req, res) => {
        res.render('productCart')
    },
}

module.exports = cartController;