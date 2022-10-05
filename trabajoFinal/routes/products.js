const express = require("express");
const fs = require("fs");
const { Router } = express;

let router = new Router();

router.get("/", (req, res) => {
  try {
    fs.readFile("./data/productos.json", "utf-8", (err, data) => {
      //muestro todos los elementos del array
      res.send(data);
    });
  } catch (error) {
    res.send({ error: "Error al leer archivo" });
  }
});
//devuelve el producto segun su ID
router.get("/:id", (req, res) => {
  try {
    fs.readFile("./data/productos.json", "utf-8", (err, data) => {
      //traigo datos
      let elementos = JSON.parse(data);
      //guardo ID
      let unID = req.params.id;
      //busco producto por ID
      const item = elementos.find((ele) => ele.id == unID);
      if (item) {
        res.send(item);
      } else {
        res.send({ error: "producto no encontrado" });
      }
    });
  } catch (error) {
    res.send({ error: "Error al leer archivo" });
  }
});

router.post("/", (req, res) => {
  try {
    fs.readFile("./data/productos.json", "utf-8", (err, data) => {
      let maxId = 0;
      let elementos = JSON.parse(data);
      //saco el maximo ID de entre los objetos, sino maxId=0
      if (elementos.length) {
        maxId = Math.max(...elementos.map((ele) => ele.id));
      }
      //creo nuevo objeto agregando campo ID y guardo en elements
      let objetoClon = {
        id: maxId + 1,
        timestamp: Date.now(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: Number(req.body.precio),
        foto: req.body.url,
        codigo: req.body.codigo,
        stock: Number(req.body.stock),
      };
      elementos.push(objetoClon);
      //almaceno la coleccion en el archivo
      try {
        fs.writeFile("./data/productos.json", JSON.stringify(elementos), (err) => {
            res.send(objetoClon);
        });
      } catch (error) {
        res.send({ error: "Error al almacenar" });
      }
    });
  } catch (error) {
    res.send({ error: "Error al leer archivo" });
  }
});

//elimino un producto segun su ID
router.delete("/:id", (req, res) => {
  try {
    fs.readFile("./data/productos.json", "utf-8", (err, data) => {
      //todos los productos
      const elementos = JSON.parse(data);
      const nuevaLista = elementos.filter((ele) => ele.id != req.params.id);
      fs.writeFile(`./data/productos.json`,JSON.stringify(nuevaLista),(err) => {
          if (err) res.send({ error: "producto no encontrado" });
          res.send("Elemento Eliminado");
        });
    });
  } catch (error) {
    res.send({ error: "Error al almacenar" });
  }
});

//actualizar un producto segun su ID
router.put("/:id", (req, res) => {
    let elemento = null;
    try {
        fs.readFile("./data/productos.json", "utf-8", (err, data) => {
            let elementos = JSON.parse(data);
            const listafiltrada = elementos.filter( (ele) => ele.id !== Number(req.params.id));
    
            //creo nuevo objeto agregando campo ID y guardo en elements
            let objetoClon = {
                id: Number(req.params.id),
                timestamp: Date.now(),
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: Number(req.body.precio),
                foto: req.body.foto,
                codigo: req.body.codigo,
                stock: Number(req.body.stock),
            };
            listafiltrada.push(objetoClon);
            //almaceno la coleccion en el archivo
            fs.writeFile("./data/productos.json", JSON.stringify(listafiltrada), (err) => {
                if (err) {
                    res.send({ error: "Error al almacenar" });
                } else {
                    res.send(listafiltrada);
                }
            });
        });
    } catch (error) {
        res.send({ error: "Error al leer archivo" });
    } 
});

module.exports = router;
