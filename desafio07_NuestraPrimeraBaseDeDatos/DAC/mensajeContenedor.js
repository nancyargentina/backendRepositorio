const knexsqlite = require ('../db/dbmsnConfig')

class MsnContenedor {
    constructor(nombreTabla, objConector) {
        this.tabla = nombreTabla;
        this.db = objConector;
    }

    async getElements() {
        try {
            //lee la tabla y retorna los mensajes
            let data = await knexsqlite.select().table(this.tabla);
            //console.log(data)
            return data;
        } catch (error) {
            throw error;
        }
    }
    async save(obj) {
        //traigo los datos y guardo el nuevo mensaje
        const {correo, fecha, msn } = obj;
        console.log(correo, fecha, msn)
       try {
            //almaceno la coleccion en el archivo
            //insert into products (correo, fecha, msn) value(vcorreo, vfecha,vmsn)
            const msnNuevo = await knexsqlite.insert({correo, fecha, msn }).from(this.tabla);
            //si se almacena correctamente actualizo el ID y muestro
            console.log("mensaje almacenado");
            console.log(msnNuevo);
            return msnNuevo;
        } catch (error) {
            console.log("Error al intentar escribir en el archivo");
            throw error;
        }
    }
}

module.exports= MsnContenedor;  