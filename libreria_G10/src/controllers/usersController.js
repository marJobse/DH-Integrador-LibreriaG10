const express = require("express");
const path = require('path');

const usersController = {
    register: (req, res) => {
        res.render('register')
    },
    login: (req, res) => {
        res.render('login')
    },
}

module.exports = usersController