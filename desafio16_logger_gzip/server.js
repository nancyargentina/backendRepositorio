const { argu } = require("./config.js");
const express = require("express");
const cluster = require("cluster");
const os = require("os");
const productRouter = require("./routes/products");
const productTestRouter = require("./routes/productos-test");
const infoRouter = require("./routes/info");
const randomRouter = require("./routes/randoms");
const app = express();
const log4js = require("./utils/logs");
//recibo /envio json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Servidor http
const http = require("http");
const server = http.createServer(app);
//Socket IO
const { Server } = require("socket.io");
const io = new Server(server);
const socketMensajes = require("./sockets/socketMensajes");
const socketproductos = require("./sockets/socketProductos");

//manejo de sesiones de navedor
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const sessionRouter = require("./routes/session");

//manejo de autenticacion
const auth = require("./auth/auth");
const passport = require("passport");
const localPassport = require("./auth/localPassport");

const iniciarBases = require("./iniciarBases");
const logger = log4js.getLogger("custom");
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

app.use((req, res, next) => {
   logger.info(`Ruta consultada: ${req.originalUrl} Metodo ${req.method}`);
   next();
});
app.use(passport.initialize());
app.use(passport.session());

app.use("/", productRouter);
app.use("/productos-test", productTestRouter);
app.use("/", sessionRouter);
app.use("/info", infoRouter);
app.use("/randoms", randomRouter);

app.get("/", auth, (req, res) => {
    
    res.render("insertProduct", { data: req.user.nombre });
});
;
/*--------------------------------connection a socket----------------------------------*/
socketproductos (io);
socketMensajes(io);

/*---------------------------MODOS DE INICIO DE SERVIDOR-------------------------------*/

if (argu.m === "CLUSTER") {
    const numProcesadores = os.cpus().length;

    if (cluster.isPrimary) {
        console.log(`Proceso maestro ${process.pid}`);
        for (let i = 0; i < numProcesadores; i++) {
            cluster.fork();
        }
        cluster.on("exit", () => {
            cluster.fork();
        });
    } else {     
        server.listen(argu.p, () => {
            console.log(
                `Escuchando el puerto ${argu.PORT} - proceso: ${process.pid}`
            );
        });
    }
} else {  
    server.listen(argu.PORT, () => {
        console.log(
            `Escuchando el puerto ${argu.PORT} - proceso: ${process.pid}`
        );
    });
}

app.use((req, res, next) => {
    logger.warn(
        `Estado: 404. Ruta consultada: ${req.originalUrl}. Metodo ${req.method}`
    );
    res.status(404).json({
        error: -2,
        descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada`,
    });
    next();
});