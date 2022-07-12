const express = require("express");
const path = require('path');

const mainController = {
    home : (req,res) => {
        res.sendFile(path.resolve(__dirname,'../views/index.html'))
    },    
}

module.exports = mainController;