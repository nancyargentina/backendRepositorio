/*
//Producto almacenado con archivos
const productDaoFile = require('./productDaoFile')
const productDao = new productDaoFile()
*/

//Productos almacenado en Mysql
const productDaoMysql = require('./producDaoMysql')
const productDao = new productDaoMysql()

module.exports= productDao