const { all } = require('express/lib/application');
const { json } = require('express/lib/response');
const fs = require('fs');

const User = {
    //propiedad para traer la info de la base de datos
    fileName: '../src/data/usersDataBase.json',

    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    generateId: function () {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser) {
            return lastUser.id + 1;
        }
        else { return 1 }
    },

    findAll: function () {
        return this.getData();
    },
    findByPk: function (id) {
        let allUsers = User.findAll();
        let userFound = allUsers.find(user => user.id == id);
        return userFound;
    },
    findByField: function (field, text) {
        let allUsers = User.findAll();
        let userFound = allUsers.find(user => user[field] == text);
        return userFound;
    },
    create: function (userData) {
        let allUsers = User.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },
    delete: function (id) {
        let allUsers = User.findAll();
        let finalUsers = allUsers.filter(user => user.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;

    },


}
console.log(User.findByPk(2));

console.log(User.findByField("email", "max@lg10.com"));
console.log(User.create({ nombre: 'Mariana', email: 'js@' }));
console.log(User.delete(7));

module.exports = User;