const express = require("express");
const fs=require("fs");
const {Router}= express;

let router =  new Router();

//crea un carrito y devuelve su id
router.post ("/",(req,res)=>{
    fs.readFile("./data/cars.json","utf-8",(err,data)=>{
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
            fs.writeFile("./data/cars.json", JSON.stringify(elementos),(err)=>{
                if (err){
                    res.send({error:"Error al almacenar"})}
                else{
                    res.send(objetoClon)}
            })
        }
    })
})
//elimino un carrito segun su ID
router.delete("/:id",(req,res)=>{
    fs.readFile("./data/cars.json","utf-8",(err,data)=>{
       if(err){
           res.send( {error:"Error al almacenar"} )
       }
       else{
           //todos los carritos
           const elementos=JSON.parse(data);
           const nuevaLista = elementos.filter(ele => ele.id != req.params.id);
           fs.writeFile(`./data/cars.json`, JSON.stringify(nuevaLista), (err) =>{
            if (err) res.send ({error:"carrito no encontrado"});
            res.send("Elemento Eliminado");
            });
       }
    })
})
//devuelve todos los productos de un carrito segun su ID
router.get("/:id/productos",(req,res)=>{
    fs.readFile("./data/cars.json","utf-8",(err,data)=>{
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
            else {res.send ({error:"carrito no encontrado"});}
       }
    })
})
//agrega productos al carrito por su id de producto
router.post ("/:id/productos",(req,res)=>{
    fs.readFile("./data/cars.json","utf-8",(err,data)=>{
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
            fs.writeFile("./data/cars.json", JSON.stringify(elementos),(err)=>{
                if (err){
                    res.send({error:"Error al almacenar"})}
                else{
                    res.send(objetoClon)}
            })
        }
    })
})
//Elimina un producto del carrito por su id de carrito y de producto
router.delete("/:id/productos/:id_prod",(req,res)=>{
    fs.readFile("./data/cars.json","utf-8",(err,data)=>{
       if(err){
           res.send( {error:"Error al almacenar"} )
       }
       else{
           //todos los carritos
           const elementos=JSON.parse(data);
           const nuevaLista = elementos.filter(ele => ele.id != req.params.id);
           fs.writeFile(`./data/cars.json`, JSON.stringify(nuevaLista), (err) =>{
            if (err) res.send ({error:"carrito no encontrado"});
            res.send("Elemento Eliminado");
            });
       }
    })
})


module.exports = router