const express = require("express");
const path = require('path');

const cartController = {
    detail : (req,res) => {
        res.sendFile(path.resolve(__dirname,'../views/productCart.html'))
    },
}

module.exports = cartController;