//contenedor de mensajes
const knexsqlite = require("./db/dbmsnConfig");
const knexsqliteModel = require("./db/models/msnModels");
let MsnContenedor = require("./DAC/mensajeContenedor");
const msnContainer = new MsnContenedor("mensajes", knexsqlite);

//contenedor de productos
const config = require("./db/dbConfig");
const productModel = require("./db/models/productModel");
let Contenedor = require("./DAC/productContenedor");
const productContainer = new Contenedor("productos", config);

//contenedor de usuarios
const conexion= require('./db/dbMongoConfig')
conexion()
let userContenedor =require('./DAC/userContenedor')
const userModel = require('./db/models/userModel')
const userContainer= new userContenedor(userModel)