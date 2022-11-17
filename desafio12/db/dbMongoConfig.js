const mongoose = require("mongoose");
const connectionString ="mongodb+srv://desafiouser:desafiouser@cluster0.5gpphrd.mongodb.net/ecommerce?retryWrites=true&w=majority";
//const connectionString='mongodb://localhost:27017/ecommercetf'
async function conexion(){
    
    try {
        await mongoose.connect(connectionString);
        console.log("Connectado a DB")
    } catch (error) {
        console.error(error);
    }
}
   
module.exports = conexion



