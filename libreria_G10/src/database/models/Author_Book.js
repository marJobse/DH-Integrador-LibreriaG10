

module.exports = (sequelize, dataTypes) => {

    let alias = "Authors_Book"; //nombre de tabla, del archivo en plural

    let columns = {  // columnas
        // id: {
        //     type: dataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true,
        // },
        libro_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
        },
        autor_id: {
            type: dataTypes.INTEGER,
        },
    };

    let config = {
        tableName: "autores_libros", // como se llama la base de datos
        timestamps: false//createdate
    };

    const Authors_Book = sequelize.define(alias, columns, config);


    return Authors_Book;
}