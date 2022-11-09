const mongoose = require("mongoose");
//const connectionString ="mongodb+srv://coderhouse:123456@cluster0.sugvijj.mongodb.net/ecommercetf?retryWrites=true&w=majority";
const connectionString='mongodb://localhost:27017/ecommercetf'
async function conexion(){
    
    try {
        await mongoose.connect(connectionString);
        console.log("Connectado a DB")
    } catch (error) {
        console.error(error);
    }
}
   
module.exports = conexion



