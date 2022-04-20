const express = require("express")
const fs=require("fs")
const { Router } = express
let router = new Router()



 router.get("/",(req,res)=>{
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

router.get("/:id",(req,res)=>{
    fs.readFile("./productos.json","utf-8",(err,data)=>{
       if(err){
           res.send("<H1>Error al leer</H1>")
       }
       else{
           //traigo datos
            let elementos = JSON.parse(data);
            console.log(elementos)
            //guardo ID
            let unID = req.params.id;
            console.log(unID)
            //busco producto por ID
            const item = elementos.find( ele => ele.id == unID);
            if (item) {res.send(item)}
            else {res.send ({error:"producto no encontrado"});}
       }
    })
})
module.exports = router

