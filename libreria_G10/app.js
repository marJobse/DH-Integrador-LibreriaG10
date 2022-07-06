const express = require('express');
const path = require('path');
const app = express();
//const publicPath = path.resolve(__dirname, './public');
const publicPath = path.join(__dirname, './public');


app.use(express.static(publicPath));


app.listen(3030, () => console.log('Servidor corriendo en el puerto 3030'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './views/index.html'));
});
app.get('/productDetail', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/productDetail.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/login.html'));
});

app.get('/carrito', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/productCart.html'));
});