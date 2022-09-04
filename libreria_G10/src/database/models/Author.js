module.exports = (sequelize, dataTypes) => {

    let alias = "Authors"; //nombre de tabla, del archivo en plural

    let columns = {  // columnas

        id: {
            type: dataTypes.INTEGER(10),
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: dataTypes.STRING,
        },
        apellido: {
            type: dataTypes.STRING,
        },

    };
    let config = {
        tableName: "autores", // como se llama la base de datos
        timestamps: false//createdate
    };

    const Authors = sequelize.define(alias, columns, config);



    return Authors;
}