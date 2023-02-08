const {config}=require('./config.js')

//contenedor de mensajes
const knexsqliteModel = require("./db/models/msnModels");
let MsnContenedor = require("./DAC/mensajeContenedor");
const msnContainer = new MsnContenedor("mensajes", config.knexsqlite);

//contenedor de productos
const productModel = require("./db/models/productModel");
let Contenedor = require("./DAC/productContenedor");
const productContainer = new Contenedor("productos", config.knexMysql);

//contenedor de usuarios
const conexion= require('./db/dbMongoConfig')
conexion()
let userContenedor =require('./DAC/userContenedor')
const userModel = require('./db/models/userModel')
const userContainer= new userContenedor(userModel)

module.exports= {msnContainer,productContainer,userContainer}