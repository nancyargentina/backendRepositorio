const express= require("express");
const {engine} = require("express-handlebars");

const app= express();

app.set("view engine", "hbs");//motor handlebars
app.set("views","./views"); //vistas hbs

app.engine("hbs", engine({
    extname:".hbs",
    defaultLayout:"main.hbs",
    partialsDir: __dirname + "/views/partials"
}))

app.get("/", (req,res)=>{
    res.render("index.hbs",{titulo:"Hola mundo hbs"})// busca views
})


app.listen(8080,()=>{
    console.log("Servidor corriendo")
})