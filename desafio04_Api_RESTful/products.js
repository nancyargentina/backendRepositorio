const express = require("express")
const fs=require("fs")
const { Router } = express
let router = new Router()


//devuelve todos los productos
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

//devuelve el producto segun su ID
router.get("/:id",(req,res)=>{
    fs.readFile("./productos.json","utf-8",(err,data)=>{
       if(err){
           res.send("<H1>Error al leer</H1>")
       }
       else{
           //traigo datos
            let elementos = JSON.parse(data);
            //guardo ID
            let unID = req.params.id;
            //busco producto por ID
            const item = elementos.find( ele => ele.id == unID);
            if (item) {res.send(item)}
            else {res.send ({error:"producto no encontrado"});}
       }
    })
})
//elimino un producto segun su ID
router.delete("/:id",(req,res)=>{
    fs.readFile("./productos.json","utf-8",(err,data)=>{
       if(err){
           res.send("<H1>Error al leer</H1>")
       }
       else{
           //todos los productos
           const elementos=JSON.parse(data);
           const nuevaLista = elementos.filter(ele => ele.id !== req.params.id);
           fs.writeFile(`./productos.json`, JSON.stringify(nuevaLista), (err) =>{
            if (err) res.send ({error:"producto no encontrado"});
            res.send("Elemento Eliminado");
            });
       }
    })
})


module.exports = router

