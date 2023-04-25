module.exports = (sequelize, dataTypes) => {

    let alias = "Editorials"; //nombre de tabla, del archivo en plural

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
        tableName: "editoriales", // como se llama la base de datos
        timestamps: false//createdate
    };

    const Editorials = sequelize.define(alias, columns, config);

    Editorials.associate = function (models) {

        Editorials.belongsToMany(models.Books, {
            as: "libros",
            through: 'editoriales_libros',
            foreignKey: 'editorial_id',
            otherKey: 'libro_id',
            timestamps: false
        })

    }

    return Editorials;
}