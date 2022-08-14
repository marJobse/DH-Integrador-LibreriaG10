const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.join(__dirname, '../public');
const mainRouter = require('./routes/mainRouter');
const productsRouter = require('./routes/productRouter');
const usersRouter = require('./routes/usersRouter');
const cartRouter = require('./routes/cartRouter');
const session = require('express-session');



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))

app.use(express.static(publicPath));


//lo indicamos como middleware a nivel app
app.use(session({ secret: "secret" }))

app.use("/", mainRouter)
app.use("/product", productsRouter)
app.use("/users", usersRouter)
app.use("/carrito", cartRouter)


app.listen(process.env.PORT || 3030, () => console.log('Servidor corriendo en el puerto 3030'));


// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, './views/index.html'));
// });
// app.get('/productDetail', (req, res) => {
//     res.sendFile(path.join(__dirname, '/views/productDetail.html'));
// });

// app.get('/register', (req, res) => {
//     res.sendFile(path.join(__dirname, '/views/register.html'));
// });

// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, '/views/login.html'));
// });

// app.get('/carrito', (req, res) => {
//     res.sendFile(path.join(__dirname, '/views/productCart.html'));
// });