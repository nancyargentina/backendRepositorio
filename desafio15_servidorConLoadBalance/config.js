require("dotenv").config();

//configuraciones para bases de datos
const config = {
    knexsqlite: {
        client: process.env.sqliteclient,
        connection: { filename: process.env.sqliteFilename },
    },

    knexMysql: {
        client: process.env.mysqlClient,
        connection: {
            host: process.env.mysqlHost,
            port: process.env.mysqlPort,
            user: process.env.mysqlUser,
            password: process.env.mysqlPassword,
            database: process.env.mysqlDatabase,
        },
    },
    mongoConnectionString: process.env.mongoBase,
};

//espero PUERTO como argumento en linea de comando
const yargs = require("yargs");
const argu = yargs(process.argv.slice(2))
    .alias({ p: "PORT", m: "MODO" })
    .default({ p: 8080 }).argv;
console.log('port: ',argu.p,', m: ',argu.m )
module.exports = { config, argu };
