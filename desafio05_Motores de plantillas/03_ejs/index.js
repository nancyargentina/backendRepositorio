//manejo servidor con express
const express= require("express")
const app= express()

const fs=require("fs")
//recibo /envio json
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//indico rutas
//const productRouter = require("./products")
//app.use("/productos", productRouter)
//uso motor de plantillas EJS
app.set("view engine", "ejs");
app.set("views","./views");


/* let arrays=JSON.stringify([
    {"title":"producto1","price":321.1,"thumbnail":"https://via.placeholder.com/150/92c952","id":1},
    {"title":"producto2","price":123.23,"thumbnail":"https://via.placeholder.com/150/771796","id":2},
    {"title":"producto3","price":345.67,"thumbnail":"https://via.placeholder.com/150/24f353","id":3},
    {"title":"prodicto5","price":2312,"thumbnail":"https://via.placeholder.com/150/0000FF/808080","id":5},
    {"title":"productoNuevo4","price":123.23,"thumbnail":"https://via.placeholder.com/150/771796","id":4}
] )*/

//devuelve todos los productos
app.get("/productos",(req,res)=>{
    fs.readFile("./productos.json","utf-8",(err,data)=>{
       if(err){
            res.render("index",{err})
       }
       else{
           //muestro todos los elementos del array
           let elementos = JSON.parse(data);
           //console.log(elementos)
           res.render("index",{data:elementos})
       }
    })
})

app.get("/",(req,res)=>{
    res.render("insertProduct")
})

//agrega un producto
app.post("/productos",(req, res)=>{

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
    })
})


app.listen(8080, ()=>{
    console.log("server Run en 8080")
})