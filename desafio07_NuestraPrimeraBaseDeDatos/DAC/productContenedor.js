const knexmysql = require ('../db/dbConfig');


class ProductosContenedor {
    constructor(nombreTabla, objConector) {
        this.tabla = nombreTabla;
        this.db = objConector;
    }

    async getElements() {
        try {
            //lee la tabla y retorna los mensajes
            let data = await knexmysql.select().table(this.tabla);
            //console.log(data)
            return data;
        } catch (error) {
            throw error;
        }
    }
    /*getAll(){
        //llama a la promesa que contiene los lementos del archivo
        this.getElements()
        .then(data =>{console.log(data);})
        .catch(error=>{console.log(error)})
    }*/

    async save(obj) {
        //traigo los datos y guardo el nuevo mensaje
        const { title, price, thumbnail } = obj;
        console.log(title, price, thumbnail)
       try {
            //almaceno la coleccion en el archivo
            //insert into products (title, price, mensaje) value(vtitle, vprice,vmensaje)
            const prodNuevo = await knexmysql.insert({ title, price, thumbnail }).from(this.tabla);
            //si se almacena correctamente actualizo el ID y muestro
            console.log("producto almacenado");
            console.log(prodNuevo);
            return prodNuevo;
        } catch (error) {
            console.log("Error al intentar escribir en el archivo");
            throw error;
        }
    }

    async getById(unId){
        try{
            let elementos =await knexmysql.select().table(this.tabla).where('id',unId);;
            return elementos
        } catch (error) {
            throw error;
        }
    }
    async deleteById(unId) {
        try {
            const eliminados =  await knexmysql(this.tabla).where('id',unId).delete()
            return eliminados
        } catch (error) {
            throw error;
        }
    }
    async deleteAll(){
        try {
            await knexmysql(this.tabla).truncate()
        } catch (error) {
            throw error;
        }
    }

} 

module.exports= ProductosContenedor;