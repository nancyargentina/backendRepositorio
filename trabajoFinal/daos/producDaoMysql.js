//contenedor de productos
const MysqlContenedor = require("../contenedores/productMysqlContenedor");
const mysqlconfig = require("../dbsConfig");
const productModel= require('../models/productsModel_MySql')

class productDaoMysql extends MysqlContenedor {
    constructor() {
        super("productos", mysqlconfig);
    }
}
module.exports = productDaoMysql;
