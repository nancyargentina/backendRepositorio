const express = require("express");
const fs=require("fs");
const {Router}= express;
//contenedor de productos
let Contenedor = require('../DAC/productContenedor');
//const productContainer= new Contenedor('./datas/productos.json');
const knexmysql = require ('../db/_dbConfig');
const productContainer= new Contenedor('productos',knexmysql);
const auth =require('../auth/auth')
const logger = log4js.getLogger("custom");

let router =  new Router();
//devuelve todos los productos
router.get("/productos",async(req,res)=>{
    let elementos = await productContainer.getElements()
    //console.log('elementos',elementos)
    if (elementos.length != 0){
        res.render("index",{data:elementos})
    }
    else {
        logger.error(`Error retornando productos: ${err}`);
        res.render("index",{err})
    }
})

//agrega un producto
router.post("/productos",async(req, res)=>{
        let obj = {
        title: req.body.titulo,
        price: Number(req.body.precio)*100,
        thumbnail: req.body.url,
    };
    const result = await productContainer.save(obj) 
    result.on('error', (error)=> logger.error(`error al agregar producto: ${error}`))
    res.render("insertProduct")
    

    /*fs.readFile("./productos.json","utf-8",(err,data)=>{
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
                id: Number(maxId)+1
            };
            elementos.push(objetoClon);
            //almaceno la coleccion en el archivo
            fs.writeFile("./productos.json", JSON.stringify(elementos),(err)=>{
                if (err){
                    res.send({error:"Error al almacenar"})}
                else{
                    res.render("insertProduct")}
            })
        }
    })*/
})

router.get('/insertProduct',auth,(req,res)=>{
    res.render("insertProduct",{data:{name:req.user.nombre,email:req.user.email}})
})
module.exports = router