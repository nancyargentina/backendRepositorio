const express = require("express");
const productRouter = require("./routes/products")
const carRouter = require("./routes/car")
/* elegir opcion en daos/index.js
1: firebase
2: mysql
3: mongo
4:file
*/

const app= express();
const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/productos", productRouter)
app.use("api/carrito", carRouter)

app.listen(PORT, ()=>{
    console.log("Servidor corriendo")
});
