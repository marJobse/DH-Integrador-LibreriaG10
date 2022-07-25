const express = require("express");
const path = require('path');

const usersController = {
    register: (req, res) => {
        res.render('../views/users/register.ejs')
    },
    login: (req, res) => {
        res.render('../views/users/login.ejs')
    },
}

module.exports = usersController