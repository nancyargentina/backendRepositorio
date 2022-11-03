const mysqlconfig= require('../data/dbsConfig')
const knex= require('knex')

const productModel= knex(mysqlconfig)

productModel.schema
    .hasTable("productos")
    .then(function (exists) {
        if (!exists) {
            return productModel.schema.createTable("productos", function (table) {
                table.increments("id").primary().notNullable();
                table.bigint("timestamp").notNullable();
                table.string("nombre").notNullable();
                table.string("descripcion").notNullable();
                table.string("codigo").notNullable();
                table.string("foto").notNullable();
                table.integer("precio").notNullable();
                table.integer("stock").notNullable();
            });
        }
    })
    .then(() => {
        console.log("Tabla Creada");
    })
    .catch((err) => {
        throw err;
    });

module.exports = productModel;