const express= require("express")
const app= express()
const fs=require("fs")

app.listen(8080, ()=>{
    console.log("server Run en 8080")
})
app.get("/",(req,res)=>{
    res.send(`<h1>Desafío 3 - servidor con Express</h1>
    <h3>/productos</h3>
    <h3>/productoRandom</h3>`)
})

app.get("/productos",(req,res)=>{
    fs.readFile("./productos.json","utf-8",(err,data)=>{
       if(err){
           res.send("<H1>Error al leer</H1>")
       }
       else{
           //muestro todos los elementos del array
           res.send(data)
       }

    })
})

app.get("/productoRandom",(req,res)=>{
    fs.readFile("./productos.json","utf-8",(err,data)=>{
       if(err){
           res.send("<H1>Error al leer</H1>")
       }
       else{
        let elementos = JSON.parse(data);
        //guardo cantidad de elementos
        let max = elementos.length;
        //genero un numero ramdon entre 0 y la longitud
        //retorno el elemento de posicion Ramdom
        res.send(elementos[Math.floor(Math.random() * max)])
       }
    })
})
// https://smoggy-material-atom.glitch.me/