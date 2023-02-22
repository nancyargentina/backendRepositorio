const knexsqlite= require ('../dbmsnConfig') 
const knex= require('knex')

const knexsqliteModel = knex(knexsqlite)

knexsqliteModel.schema
    .hasTable("mensajes")
    .then(function (exists) {
        if (!exists) {
           return knexsqlite.schema.createTable("mensajes", function (table) {
                table.increments("id").primary().notNullable();
                table.string("correo").notNullable();
                table.bigint("fecha").notNullable();
                table.string("msn").notNullable();
            });
        }
    })
    .then(() => {
        console.log("Tabla mensaje Creada");
    })
    .catch((err) => {
        throw err;
    });

module.exports = knexsqliteModel;