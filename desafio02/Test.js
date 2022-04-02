let Contenedor = require('./Contenedor.js');
const productContainer= new Contenedor('productos.json');

//1-muestro archivo
productContainer.getAll();

/*//2-guardo un producto
const unProd={
    title: 'producto1',
    price: 1.14,
    thumbnail:'http://unaurl.com'
}
productContainer.save(unProd);*/

/*//3- busco por ID
productContainer.getById(2);
productContainer.getById(6);
*/

/*//4- Elemino por ID
productContainer.deleteById(2);
productContainer.deleteById(4);
*/

//5- Eliminar todo el contenido
//productContainer.deleteAll();