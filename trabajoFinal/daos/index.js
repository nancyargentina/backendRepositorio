/*
//Producto almacenado con archivos
const productDaoFile = require('./productDaoFile')
const productDao = new productDaoFile()
*/
/*
//Productos almacenado en Mysql
const productDaoMysql = require('./producDaoMysql')
const productDao = new productDaoMysql()
*/

//Productos almacenado en Mongo
const conexion = require('../dbMongoConfig')
conexion()
const productDaoMongo = require('./productDaoMongo')
const productDao= new productDaoMongo()

module.exports= productDao