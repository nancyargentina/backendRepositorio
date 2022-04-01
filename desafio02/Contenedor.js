let fs = require('fs');

class Contenedor {
    constructor (nombreArchivo){
        this.archivo= nombreArchivo;
        this.maxId= 0;
    }
    async maximoId(){
        
        try {
            const lectura = await fs.promises.readFile(`./${this.archivo}`,"utf8")
            if (lectura.length){
                const lprods=JSON.parse(lectura);
                this.maxId= Math.max(...lprods.map(ele => ele.id));
                return this.maxId;
            }                       
        } catch (error) {
            console.log('Error al intentar leer el archivo',error);

        }
    }
    async save (obj){
        const unJson = await this.getAllItems();
        let objetoClon={...obj, id: this.maximoId()+1};
        unJson.push(objetoClon);
        try {
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(objetoClon))
            this.maximoId += 1;
            console.log('Objeto ingresado');
        } catch (error) {
            console.log('Error al intentar escribir en el archivo')
        }
    }
    async getById(unId){
        try {
            const lectura = await fs.promises.readFile(`./${this.archivo}`,"utf8")
            const lprods=JSON.parse(lectura);
            const item = json.find((ele) => ele.id === id);
            if (typeof item === "undefined") {
            return null;
            } else {
            return item;
            }
        } catch (error) {
            console.log('Error al intentar leer el archivo',error);

        }
    }

    async getAllItems() {
        const data = await fs.promises.readFile(`./${this.archivo}`, "utf8", function (err, data) {
            if (err) throw err;
            const json = JSON.parse(data);
            return json;
            });
        return JSON.parse(data);
    }

    async deleteItemById(unId) {
        const json = await this.getAllItems();
        const nuevaLista = json.filter((ele) => ele.id !== unId);
        fs.writeFile(`./${this.archivo}`, JSON.stringify(nuevaLista), (err) =>{
            if (err) throw err;
            console.log("Elemento Eliminado");
            });
    }
    deleteAll(){
        fs.truncate(`./${this.archivo}`,0,function (err) {
            if (err) throw err;
            console.log('Contenido del archivo eliminado');
            });
    }
}

const productos= new Contenedor('productos.json')
const unProd={
    title: 'producto1',
    price: 1.14,
    thumbnail:'http://unaurl.com'
}
console.log(productos.maximoId())
//productos.save(unProd)
//console.log(productos)

