module.exports = (sequelize, dataTypes) => {

    let alias = "Languages"; //nombre de tabla, del archivo en plural

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
        tableName: "idiomas", // como se llama la base de datos
        timestamps: false//createdate
    };

    const Languages = sequelize.define(alias, columns, config);

    Languages.associate = function (model) {
        Languages.hasMany(model.Books, {
            as: 'libros',
            foreignKey: 'idioma_id'
        })
    }

    return Languages;
}