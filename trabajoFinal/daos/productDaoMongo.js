//const conexion = require('../dbMongoConfig')
const productMongoContenedor = require('../contenedores/productMongoContenedor')
const productModel = require('../models/productsModel_mongo')

class productMongoDao extends productMongoContenedor{
    constructor(){
        super(productModel)
    }
}

module.exports= productMongoDao
