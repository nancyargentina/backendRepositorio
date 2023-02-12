const express = require("express");
const os = require("os");
const { Router } = express;
const compression = require("compression");
const datos = {
    "argumentos de entrada": process.argv, //argumentos de entrada
    "Path de ejecución": process.execPath, //Path de ejecución
    "Sistema operativo": process.platform, //nombre de la plataforma (sistema operativo)
    "Id de proceso": process.pid, //Process id
    "Versión de node.js": process.version, //Versión de node.js
    "Carpeta de proyecto": process.cwd(), //Carpeta de proyecto
    memoriaTotal: process.memoryUsage.rss(), //memoria total reservada(rss)
    "Numero de procesadores":os.cpus().length
};

let router = new Router();
//devuelve todos los productos
router.get("/", (req, res) => {
    res.render("info", { data: datos });
});
router.get("/compresion",compression(), (req, res) => {
    res.render("info", { data: datos });
});
module.exports = router;
