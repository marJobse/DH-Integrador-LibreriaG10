

module.exports = (sequelize, dataTypes) => {

    let alias = "Genres_Book"; //nombre de tabla, del archivo en plural

    let columns = {  // columnas

        libro_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
        },
        genero_id: {
            type: dataTypes.INTEGER,
        },
    };

    let config = {
        tableName: "generos_libros", // como se llama la base de datos
        timestamps: false//createdate
    };

    const Genres_Book = sequelize.define(alias, columns, config);


    return Genres_Book;
}