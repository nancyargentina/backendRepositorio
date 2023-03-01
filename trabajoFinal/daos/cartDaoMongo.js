const mongoContenedor = require('../contenedores/mongoContenedor')
const cartModel = require('../models/cartModel_mongo')

class cartMongoDao extends mongoContenedor{
    constructor(){
        super(cartModel)
    }

    async getProductsfromCart(unId){
        const unCarrito = await this.collection.getById(unId)
        return unCarrito.productos
   }
   //aca----- guardar el producto al carrito
   async addProductInCart(idCart,productId,cant){
    const unCarrito = await this.collection.getById(unId)

    return
   }
}


module.exports= cartMongoDao
