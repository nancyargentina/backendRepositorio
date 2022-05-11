const express= require("express");
const app= express();
const fs=require("fs")
//recibo /envio json
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//uso motor de plantillas PUG
app.set("view engine", "pug");//motor pug
app.set("views","./views"); //vistas pug

app.get("/", (req,res)=>{
    res.render("insertProduct")
})

//devuelve todos los productos
app.get("/productos",(req,res)=>{
    fs.readFile("./productos.json","utf-8",(err,data)=>{
       if(err){
            res.render("index",{err})
       }
       else{
           //muestro todos los elementos del array
           let elementos = JSON.parse(data);
           res.render("index",{data:elementos})
       }
    })
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

app.listen(8080,()=>{
    console.log("Servidor corriendo")
})