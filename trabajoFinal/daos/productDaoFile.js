//contenedor de productos
const ArchivoContenedor =require('../contenedores/productsFileContenedor')

class productDaoFile extends ArchivoContenedor {
constructor(){
    super('../../data/productos.json')
}

}
module.exports= productDaoFile