const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.join(__dirname, '../public');
const mainRouter = require('./routes/mainRouter');
const productsRouter = require('./routes/productRouter');
const usersRouter = require('./routes/usersRouter');
const cartRouter = require('./routes/cartRouter');
const genresRouter = require('./routes/genresRouter');
const editorialsRouter = require('./routes/editorialsRouter');
const languajesRouter = require('./routes/languajesRouter');

const authorsRouter = require('./routes/authorsRouter');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const validationLoginMiddleware = require('../middlewares/validationLoginMiddleware');
const recordameMiddleware = require('../middlewares/recordameMiddleware');
var methodOverride = require('method-override')


const bcrypt = require('bcrypt');

//Capturar la información--> post del login funciona con esto
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// view engine setup
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs');

app.use(express.static(publicPath));


//lo indicamos como middleware a nivel app(que todas las pags utilicen sesion)
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false // para que no aparezcan los deprecated undefined...
}))

//el texto dentro de session va a identificar el sitio web

app.use("/", mainRouter)
app.use("/product", productsRouter)
app.use("/users", usersRouter)
app.use("/genres", genresRouter)
app.use("/editorials", editorialsRouter)
app.use("/languajes", languajesRouter)
app.use("/authors", authorsRouter)


app.use("/carrito", cartRouter)

app.use(validationLoginMiddleware);
app.use(cookieParser());
app.use(recordameMiddleware);
app.use(methodOverride('_method'))


app.listen(process.env.PORT || 3030, () => console.log('Servidor corriendo en el puerto 3030'));

