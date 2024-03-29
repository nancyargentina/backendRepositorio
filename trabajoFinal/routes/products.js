const express = require("express");
//const fs = require("fs");
const { Router } = express;
//contenedor de productos
//let ArchivoContenedor = require("../contenedores/productsFileContenedor");
//const productContainer = new ArchivoContenedor('../../data/productos.json');
const productDao =require('../daos/index')

let router = new Router();
//devuelve todos los productos
router.get("/", async (req, res) => {
    try {
        let elementos = await productDao.getElements();
        res.send({ data: elementos });
    } catch (error) {
        res.send({ error: "Error al leer archivo" });
    }
});
//devuelve el producto segun su ID
router.get("/:id", async(req, res) => {
  try{
    //guardo ID
    //let unID = Number(req.params.id )
    let unID =req.params.id
    //busco elemento por ID
    const elemento= await  productDao.getById(unID)
      if(elemento.length!==0){
        res.send({"data":elemento});
      }
      else{
        res.send({ error: "producto no encontrado" });
      }
  } catch(error){
    console.log(error)
  }
})  

router.post("/", async (req, res) => {
    try {
        //creo nuevo objeto agregando campo ID y guardo en elements
        let objetoClon = {
            timestamp: Date.now(),
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: Number(req.body.precio)*100,
            foto: req.body.foto,
            codigo: req.body.codigo,
            stock: Number(req.body.stock),
        };
        let maxId = await productDao.save(objetoClon);
        res.send({maxId});
    } catch (error) {
        res.send({ error: "Error al almacenar" });
    }
});

//elimino un producto segun su ID
router.delete("/:id", async(req, res) => {
    try {
        await productDao.deleteById(req.params.id);
        res.send("Elemento Eliminado");
    } catch (error) {
        res.send({ error: "producto no encontrado" });
    }
});

//actualizar un producto segun su ID
router.put("/:id", async (req, res) => {
    try {
        //creo nuevo objeto agregando campo ID y guardo en elements
        let objetoClon = {
            //id: Number(req.params.id),
            id: req.params.id,
            timestamp: Date.now(),
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: Number(req.body.precio)*100,
            foto: req.body.foto,
            codigo: req.body.codigo,
            stock: Number(req.body.stock),
        };
        let productModified = await productDao.update(objetoClon);
        res.send(productModified);
    } catch (error) {
        res.send({ error: "Error al leer archivo" });
    }
});

module.exports = router;
