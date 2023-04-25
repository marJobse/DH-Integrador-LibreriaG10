module.exports = (sequelize, dataTypes) => {

    let alias = "Discounts"; //nombre de tabla, del archivo en plural

    let columns = {  // columnas

        id: {
            type: dataTypes.INTEGER(10),
            autoIncrement: true,
            primaryKey: true,
        },
        codigo: {
            type: dataTypes.STRING,
        },
        descuento: {
            type: dataTypes.DECIMAL,
        },
    };
    let config = {
        tableName: "descuentos", // como se llama la base de datos
        timestamps: false//createdate
    };

    const Discounts = sequelize.define(alias, columns, config);

    //Genres.associate = function (models) {
    //  Genres.hasMany(models.Books, {
    //     as: "libros",
    //     foreignKey: 'genero_id'
    // })

    // }

    return Discounts;
}