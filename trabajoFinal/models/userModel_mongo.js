const mongoose =require('mongoose');
/*const direccionSchema= new mongoose.Schema({
    calle:String,
    numero: String,
    ciudad:String,
    provincia:String,
    pais:String
})*/
const userSchema= new mongoose.Schema({
    nombre:{ type: String, required: true, maxLength: 50},
    email:{ type: String, required: true, maxLength: 50},
    password:{ type: String, required: true, maxLength: 100},
    //direccion:[direccionSchema],
    direccion:{calle:String,
        numero: String,
        ciudad:String,
        provincia:String,
        pais:String,
        edad:{type:Number},
        telefono:{type: String,maxLength: 15},
        foto:{type:String}
    }
});
const userModel= mongoose.model("usuarios", userSchema);
module.exports= userModel