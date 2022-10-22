const express = require("express");
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
const knexsqlite = require ('./db/dbmsnConfig')
const knexsqliteModel = require('./db/models/msnModels')
let MsnContenedor = require('./DAC/mensajeContenedor');
const msnContainer= new MsnContenedor('mensajes',knexsqlite);

//contenedor de productos
const config =require('./db/dbConfig')
const productModel= require('./db/models/productModel')
let Contenedor = require('./DAC/productContenedor');
const productContainer= new Contenedor('productos', config);


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
io.on("connection",async(socket)=>{
    console.log("usuarios conectado")

    socket.emit("productos" ,await productContainer.getElements()) //envio productos 
    socket.emit("msn_send", await msnContainer.getElements());//envio mensajes de usuarios

    //al recibir un producto guardo y lo muestro
    socket.on("CargarProducto",async(data)=>{
        await productContainer.save(data)
        io.sockets.emit("productos",await productContainer.getElements())
    })

    //al recibir msj de chat guardo y lo muestro
    socket.on ("mensaje_chat",async(data)=>{
        await msnContainer.save(data)
        io.sockets.emit("msn_send", await msnContainer.getElements())
    })
})

server.listen(8080,()=>{
    console.log("Servidor corriendo")
})