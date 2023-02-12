//const knexsqlite= require ('../dbmsnConfig') 
const {config} = require('../../config')
const knex= require('knex')

const knexsqliteModel = knex(config.knexsqlite)

knexsqliteModel.schema
    .hasTable("mensajes")
    .then(function (exists) {
        if (!exists) {
           return config.knexsqlite.schema.createTable("mensajes", function (table) {
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