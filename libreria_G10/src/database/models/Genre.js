module.exports = (sequelize, dataTypes) => {

    let alias = "Genres"; //nombre de tabla, del archivo en plural

    let columns = {  // columnas

        id: {
            type: dataTypes.INTEGER(10),
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: dataTypes.STRING,
        },
    };
    let config = {
        tableName: "generos", // como se llama la base de datos
        timestamps: false//createdate
    };

    const Genres = sequelize.define(alias, columns, config);

    //Genres.associate = function (models) {
    //  Genres.hasMany(models.Books, {
    //     as: "libros",
    //     foreignKey: 'genero_id'
    // })

    // }

    return Genres;
}