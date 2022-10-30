const config= require('../mysqlConfig')
const knex= require('knex')

const productModel= knex(config)

productModel.schema
    .hasTable("productos")
    .then(function (exists) {
        if (!exists) {
            return productModel.schema.createTable("productos", function (table) {
                table.increments("id").primary().notNullable();
                table.string("nombre").notNullable();
                table.strring("descripcion").notNullable();
                table.integer("precio").notNullable();
                table.string("foto").notNullable();
                table.string("codigo").notNullable();
                table.integer("stock").notNullable();
                table.bigint("stamp").notNullable()
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