let fs = require('fs');

class Contenedor {
    constructor (nombreArchivo){
        this.archivo= nombreArchivo;
        this.maxId= 0;
    }

    async getElements() {
        //lee archivo y retorna una promesa con los datos como objetos
        try {
            const data = await fs.promises.readFile(`./${this.archivo}`, "utf8")
            return JSON.parse(data);
        } catch (error) {
            console.log('Error al leer los elementos del archivo')
        }
    }
    getAll(){
        //llama a la promesa que contiene los lementos del archivo
        this.getElements()
        .then(data =>{console.log(data);})
        .catch(error=>{console.log(error)})
    }

    async save(obj){
        //conjunto de objetos del archivo
        let elementos =await this.getElements();
        //saco el maximo ID de entre los objetos, sino maxId=0
        if (elementos.length){
            this.maxId = Math.max(...elementos.map(ele => ele.id));
        };
        //creo nuevo objeto agregando campo ID y guardo en elements
        let objetoClon={...obj, id: this.maxId+1};
        elementos.push(objetoClon);
        //almaceno la coleccion en el archivo
        fs.writeFile(`./${this.archivo}`, JSON.stringify(elementos),(err)=>{
            if (err){
                console.log('Error al intentar escribir en el archivo')}
            else{
                //si se almacena correctamente actualizo el ID y muestro
                this.maxId += 1;
                console.log(this.maxId);}
        })
    }

    async getById(unId){
        let elemento=null;
        try{
            let elementos =await this.getElements();
            const item = elementos.find((ele) => ele.id === unId);
            if (item) {elemento=item}
        }
        catch{console.log('Error buscando por Id',error)}
        finally{console.log(elemento)}
    }

    async deleteById(unId) {
        const elementos = await this.getElements();
        console.log('Elelementos',elementos);
        const nuevaLista = elementos.filter(ele => ele.id !== unId);
        console.log('nuevaLista',nuevaLista);
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

module.exports= Contenedor;