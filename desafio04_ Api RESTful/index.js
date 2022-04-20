const express= require("express")
const app= express()
const productRouter = require("./products")
app.use("/api/productos", productRouter)

app.use(express.static("public"))


app.get("/",(req,res)=>{
    res.send(`<h1>Desafío 4 - Api restful</h1>
    <h3><b>GET </B>/api/productos</h3>
    <h3><b>GET </B>/api/productos/id</h3>
    <h3><b>POST </B>/api/productos</h3>
    <h3><b>PUT </B>/api/productos/id</h3>
    <h3><b>DELETE </B>/api/productos/id</h3>`)
})

app.listen(8080, ()=>{
    console.log("server Run en 8080")
})

// https://smoggy-material-atom.glitch.me/