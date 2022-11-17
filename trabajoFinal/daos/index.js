/* elegir opcion:
1: firebase
2: mysql
3: mongo
4:file
*/
const unaOpcion = 4; //elijo una opcion de base de datos
let productDao ;
if (unaOpcion == 1) {
    //Productos almacenado en Firebase
    const dbFirebase = require("../data/dbFirebaseConfig");
    const productDaoFirebase = require("./productDaoFirebase");
    productDao = new productDaoFirebase();

} else if (unaOpcion == 2) {
    //Productos almacenado en Mysql
    const productDaoMysql = require("./producDaoMysql");
    productDao = new productDaoMysql();

} else if (unaOpcion == 3) {
    //Productos almacenado en Mongo
    const conexion = require("../data/dbMongoConfig");
    conexion();
    const productDaoMongo = require("./productDaoMongo");
    productDao = new productDaoMongo();

} else {
    //Producto almacenado con archivos
    const productDaoFile = require("./productDaoFile");
    productDao = new productDaoFile();
}
module.exports = productDao;
