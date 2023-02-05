const mongoose =require('mongoose');

const userSchema= new mongoose.Schema({
    nombre:{ type: String, required: true, maxLength: 50},
    email:{ type: String, required: true, maxLength: 50},
    password:{ type: String, required: true, maxLength: 100}
});
const userModel= mongoose.model("usuarios", userSchema);
module.exports= userModel