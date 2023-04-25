module.exports = (sequelize, dataTypes) => {

    let alias = "Users"; //nombre de tabla, del archivo en plural

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
        domicilio: {
            type: dataTypes.STRING,
        },
        email: {
            type: dataTypes.STRING,
        },
        imagen: {
            type: dataTypes.STRING,
        },
        telefono: {
            type: dataTypes.STRING,
        },
        tipo_id: {
            type: dataTypes.INTEGER(10),
        },
        password: {
            type: dataTypes.STRING,
        },
    };
    let config = {
        tableName: "usuarios", // como se llama la base de datos
        timestamps: false//createdate
    };

    const Users = sequelize.define(alias, columns, config);


    return Users;
}

//INSERT INTO usuarios(nombre,apellido,domicilio,email,password) VALUES ('Mar', 'Jobse', 'La Plata 2','mar@gmail.com','11111111');