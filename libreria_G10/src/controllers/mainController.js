const db = require('../database/models');

const mainController = {
    home: (req, res)=> {
        db.Books.findAll({
            include: [
                {association: 'editoriales'},
                {association: 'autores'}]
        })
        .then(products=>{
            res.render('../views/index.ejs', { products })
        })
    },
}

module.exports = mainController;