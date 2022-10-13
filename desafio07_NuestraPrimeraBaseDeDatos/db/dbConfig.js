const knexmysql = require("knex")({
    client: "mysql",
    connection: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "basecoder",
    },
});

knexmysql.schema
    .hasTable("productos")
    .then(function (exists) {
        if (!exists) {
           return knexmysql.schema.createTable("productos", function (table) {
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

module.exports = knexmysql;
