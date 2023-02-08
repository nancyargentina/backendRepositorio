//const config= require('../dbConfig')
const {config}= require('../../config')
const knex= require('knex')

const productModel= knex(config.knexMysql)

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
        console.log("Tabla productos Creada MySql");
    })
    .catch((err) => {
        throw err;
    });

module.exports = productModel;