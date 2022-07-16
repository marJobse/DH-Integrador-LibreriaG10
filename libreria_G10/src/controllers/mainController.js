const express = require("express");
const path = require('path');

const mainController = {
    home: (req, res) => {
        res.render('index')
    },
}

module.exports = mainController;