const express = require("express")
const fs=require("fs")
const { Router } = express
let router = new Router()



//devuelve todos los productos
 router.get("/",(req,res)=>{
    fs.readFile("./productos.json","utf-8",(err,data)=>{
       if(err){
        res.render("index",{error:"Error al leer archivo"})
       }
       else{
           //muestro todos los elementos del array
           let elementos = JSON.parse(data);
           res.render("index",elementos)
       }
    })
})

//devuelve el producto segun su ID
router.get("/:id",(req,res)=>{
    fs.readFile("./productos.json","utf-8",(err,data)=>{
       if(err){
        res.send({error:"Error al leer archivo"})
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
           res.send( {error:"Error al almacenar"} )
       }
       else{
           //todos los productos
           const elementos=JSON.parse(data);
           const nuevaLista = elementos.filter(ele => ele.id != req.params.id);
           fs.writeFile(`./productos.json`, JSON.stringify(nuevaLista), (err) =>{
            if (err) res.send ({error:"producto no encontrado"});
            res.send("Elemento Eliminado");
            });
       }
    })
})

//agrega un producto
router.post("/",(req, res)=>{

    fs.readFile("./productos.json","utf-8",(err,data)=>{
        if(err){
            res.send({error:"Error al leer archivo"})
        }
        else{
            let maxId =0;
            let elementos = JSON.parse(data);
            //saco el maximo ID de entre los objetos, sino maxId=0
            if (elementos.length){
                maxId = Math.max(...elementos.map(ele => ele.id));
            };
            //creo nuevo objeto agregando campo ID y guardo en elements
            let objetoClon = {
                title: req.body.titulo,
                price: Number(req.body.precio),
                thumbail: req.body.url,
                id: maxId+1
            };
            elementos.push(objetoClon);
            //almaceno la coleccion en el archivo
            fs.writeFile("./productos.json", JSON.stringify(elementos),(err)=>{
                if (err){
                    res.send({error:"Error al almacenar"})}
                else{
                    res.send(objetoClon)}
            })
        }
    })
})

//actualizar un producto segun su ID
router.put("/:id",(req,res)=>{
    let elemento=null;
    fs.readFile("./productos.json","utf-8",(err,data)=>{
        if(err){ res.send({error:"Error al leer archivo"}) }
        else{
            let elementos = JSON.parse(data);
            const listafiltrada = elementos.filter(ele => ele.id !== req.params.id);
            //creo nuevo objeto agregando campo ID y guardo en elements
            let objetoClon = {
                title: req.body.title,
                //price: Number(req.body.price),
                price: req.body.price,
                thumbail: req.body.thumbail,
                id: req.params.id
            };
            listafiltrada.push(objetoClon);
            //almaceno la coleccion en el archivo
            fs.writeFile("./productos.json", JSON.stringify(listafiltrada),(err)=>{
                if (err){
                    res.send({error:"Error al almacenar"})}
                else{
                    res.send(listafiltrada)}
            })
        }
    })       
})

module.exports = router

