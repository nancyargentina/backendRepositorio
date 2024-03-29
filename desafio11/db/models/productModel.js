const config= require('../dbConfig')
const knex= require('knex')

const productModel= knex(config)

productModel.schema
    .hasTable("productos")
    .then(function (exists) {
        if (!exists) {
            return productModel.schema.createTable("productos", function (table) {
                table.increments("id").primary().notNullable();
                table.string("title").notNullable();
                table.integer("price").notNullable();
                table.string("thumbnail").notNullable();
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