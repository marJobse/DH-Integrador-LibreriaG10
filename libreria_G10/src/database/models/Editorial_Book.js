

module.exports = (sequelize, dataTypes) => {

    let alias = "Editorials_Book"; //nombre de tabla, del archivo en plural

    let columns = {  // columnas
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        libro_id: {
            type: dataTypes.INTEGER,
        },
        editorial_id: {
            type: dataTypes.INTEGER,
        },
    };

    let config = {
        tableName: "editoriales_libros", // como se llama la base de datos
        timestamps: false//createdate
    };

    const Editorials_Book = sequelize.define(alias, columns, config);


    return Editorials_Book;
}