module.exports = (sequelize, dataTypes) => {

    let alias = "Books"; //nombre de tabla, del archivo en plural

    let columns = {  // columnas

        id: {
            type: dataTypes.INTEGER(4),
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: dataTypes.STRING,
        },
        resenia: {
            type: dataTypes.TEXT,
        },
        precio: {
            type: dataTypes.INTEGER(6),
        },
        imagen: {
            type: dataTypes.STRING,
        },
        anio_edicion: {
            type: dataTypes.STRING,
        },
        fecha_publicacion: {
            type: dataTypes.DATE,
        },
        stock: {
            type: dataTypes.INTEGER(6),
        },
        nro_paginas: {
            type: dataTypes.INTEGER(6),
        },
        idioma_id: {
            type: dataTypes.INTEGER(4),
        },
        isbn: {
            type: dataTypes.INTEGER(20),
        },
    };
    let config = {
        tableName: "libros", // como se llama la base de datos
        timestamps: false//createdate
    };

    const Book = sequelize.define(alias, columns, config);

    Book.associate = function (model) {
        Book.belongsTo(model.Languages, {
            as: 'idiomas',
            foreignKey: 'idioma_id'
        })
        Book.belongsToMany(model.Genres, {
            as: 'generos',
            through: 'generos_libros',
            foreignKey: 'libro_id',
            otherKey: 'genero_id',
            timestamps: false
        })
        Book.belongsToMany(model.Editorials, {
            as: 'editoriales',
            through: 'editoriales_libros',
            foreignKey: 'libro_id',
            otherKey: 'editorial_id',
            timestamps: false
        })
    }



    return Book;
}