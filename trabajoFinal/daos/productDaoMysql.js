//contenedor de productos
const MysqlContenedor = require("../contenedores/productMysqlContenedor");
const mysqlconfig = require("../data/dbsConfig");
const productModel= require('../models/productsModel_MySql')

class productDaoMysql extends MysqlContenedor {
    constructor() {
        super("productos", mysqlconfig);
    }
}
module.exports = productDaoMysql;
