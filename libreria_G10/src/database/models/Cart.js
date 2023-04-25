module.exports = (sequelize, dataTypes) => {

    let alias = "Cart"; //nombre de tabla, del archivo en plural

    let columns = {  // columnas

        id: {
            type: dataTypes.INTEGER(10),
            autoIncrement: true,
            primaryKey: true,
        },
        fecha: {
            type: dataTypes.DATE,
        },
        direccion: {
            type: dataTypes.STRING,
        },
        total: {
            type: dataTypes.INTEGER(10),
        },
        usuario_id: {
            type: dataTypes.INTEGER(10),
        },
        carrito_id: {
            type: dataTypes.INTEGER(10),
        },
    };
    let config = {
        tableName: "orden", // como se llama la base de datos
        timestamps: false,//createdate
    };

    const Cart = sequelize.define(alias, columns, config);


    return Cart;
}