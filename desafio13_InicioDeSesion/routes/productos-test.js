const express = require("express");
const { Router } = express;
//contenedor de productos
let Contenedor = require("../DAC/productContenedor");
//const productContainer= new Contenedor('./datas/productos.json');
const knexmysql = require("../db/dbConfig");
const mockProductos = require("../utils/moks");
const productContainer = new Contenedor("productos", knexmysql);

let router = new Router();
//devuelve todos los productos
router.get("/", (req, res) => {
    let productosprueba = [];
    for (let index = 0; index < 5; index++) {
        productosprueba.push(mockProductos());
    }
    res.render("index", { data: productosprueba });
   
});

module.exports = router;
