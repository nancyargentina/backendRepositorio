const fs=require("fs");

class MsnContenedor {
    constructor (nombreArchivo){
        this.archivo= nombreArchivo;
    }

    getElements() {
        //lee archivo y retorna los mensajes de manera sincrónica
      let data =fs.readFileSync(`${this.archivo}`, "utf8")
       return JSON.parse(data)
    }

    async save(obj){
        //traigo los datos y guardo el nuevo mensaje
        let elementos =this.getElements();
        elementos.push(obj);
        //almaceno la coleccion en el archivo
        fs.writeFile(`${this.archivo}`, JSON.stringify(elementos),(err)=>{
            if (err){
                console.log('Error al intentar escribir en el archivo')}
            else{
                //si se almacena correctamente actualizo el ID y muestro
                console.log("msn almacenado")
            }
        })
    }
}

module.exports= MsnContenedor;  