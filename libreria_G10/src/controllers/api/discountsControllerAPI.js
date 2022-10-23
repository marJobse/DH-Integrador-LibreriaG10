const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");



const discountsAPIController = {
    'search': (req, res) => {
               db.Discounts.findOne({were: {code: req.params.id}})
        .then(discount => {
            let respuesta = {
                meta: {
                    status : 200,
                    url: 'api/discounts'
                },
                data: discount
            }
                res.json(respuesta);
            })
    },
    
}

module.exports = discountsAPIController;