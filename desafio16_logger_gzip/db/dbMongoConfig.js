const mongoose = require("mongoose");
const {config}= require('../config')
const connectionString = config.mongoConnectionString
//const connectionString='mongodb://localhost:27017/ecommercetf'
async function conexion(){
    
    try {
        await mongoose.connect(connectionString);
        console.log("Connectado a MongoDB")
    } catch (error) {
        console.error(error);
    }
}
   
module.exports = conexion



