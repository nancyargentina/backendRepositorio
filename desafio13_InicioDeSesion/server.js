const express = require("express");
const productRouter = require("./routes/products");
const productTestRouter = require("./routes/productos-test");
const app = express();
//recibo /envio json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Servidor http
const http = require("http");
const server = http.createServer(app);
//Socket IO
const { Server } = require("socket.io");
const io = new Server(server);

//manejo de sesiones de navedor
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const sessionRouter = require("./routes/session");

//manejo de autenticacion
const auth = require("./auth/auth");
const passport=require("passport")
const localPassport=require("./auth/localPassport")

const iniciarBases=require('./iniciarBases')
/*--------------------uso motor de plantillas HANDLEBARS-----------------------------*/
const { engine } = require("express-handlebars");
app.set("view engine", "hbs"); //motor handlebars
app.set("views", "./views"); //vistas hbs

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "main.hbs",
        partialsDir: __dirname + "/views/partials",
        layoutsDir: __dirname + "/views/layouts",
    })
);
app.use(express.static(__dirname + "/public"));
/*-------------------------------------------------------------------------------------*/
app.use(
    session({
        secret: "mongoKey",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl:
                "mongodb+srv://coderhouse:coderhouse@cluster0.5gpphrd.mongodb.net/ecommerce?retryWrites=true&w=majority",
            ttl: 60,
        }),
        //,cookie:{maxAge:30000}
    })
);
/*-------------------------------------Rutas------------------------------------------*/
app.use(passport.initialize())
app.use(passport.session())

app.use("/", productRouter);
app.use("/productos-test", productTestRouter);
app.use("/", sessionRouter);



app.get("/", auth, (req, res) => {
    console.log("entro en server/ render insertProduct")
    res.render("insertProduct", { data: req.user.nombre });
});

/*app.get("/", auth,(req, res) => {
    res.render("insertProduct");
});*/


/*--------------------------------connection a socket----------------------------------*/
io.on("connection", async (socket) => {
    console.log("usuarios conectado");

    socket.emit("productos", await iniciarBases.productContainer.getElements()); //envio productos
    socket.emit("msn_send", await iniciarBases.msnContainer.getElements()); //envio mensajes de usuarios

    //al recibir un producto guardo y lo muestro
    socket.on("CargarProducto", async (data) => {
        await iniciarBases.productContainer.save(data);
        io.sockets.emit("productos", await iniciarBases.productContainer.getElements());
    });

    //al recibir msj de chat guardo y lo muestro
    socket.on("mensaje_chat", async (data) => {
        await iniciarBases.msnContainer.save(data);
        io.sockets.emit("msn_send", await iniciarBases.msnContainer.getElements());
    });
});

/*-------------------------------------------------------------------------------*/
server.listen(8080, () => {
    console.log("Servidor corriendo");
});
