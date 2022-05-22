const express = require("express");
/*const fs=require("fs");*/
const productRouter = require("./routes/products")
const {engine} = require("express-handlebars");
const app= express();
//recibo /envio json
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//Servidor http
const http = require("http")
const server = http.createServer(app)
//Socket IO
const {Server}=require("socket.io")
const io= new Server(server)
//contenedor de mensajes
let MsnContenedor = require('./mensajes');
const msnContainer= new MsnContenedor('./datas/mensajes.json');
//contenedor de productos
let Contenedor = require('./productosContenedor');
const productContainer= new Contenedor('./datas/productos.json');

//uso motor de plantillas HANDLEBARS
app.set("view engine", "hbs");//motor handlebars
app.set("views","./views"); //vistas hbs

app.engine("hbs", 
engine({extname:".hbs",
    defaultLayout:"main.hbs",
    partialsDir: __dirname + "/views/partials",
    layoutsDir: __dirname + "/views/layouts"
}))
app.use(express.static( __dirname + "/public") )
app.use("/", productRouter)

app.get("/", (req,res)=>{
    res.render("insertProduct")
})


//connection a socket
io.on("connection",(socket)=>{
    console.log("usuarios conectado")

    socket.emit("productos" ,productContainer.getElements()) //envio productos 
    socket.emit("msn_send", msnContainer.getElements());//envio mensajes de usuarios

    //al recibir un producto guardo y lo muestro
    socket.on("CargarProducto",(data)=>{
        productContainer.save(data)
        io.sockets.emit("productos",productContainer.getElements())
    })

    //al recibir msj de chat guardo y lo muestro
    socket.on ("mensaje_chat",(data)=>{
        msnContainer.save(data)
        io.sockets.emit("msn_send", msnContainer.getElements())
    })
})

server.listen(8080,()=>{
    console.log("Servidor corriendo")
})