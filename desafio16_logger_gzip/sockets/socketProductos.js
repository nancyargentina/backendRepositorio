const iniciarBases = require("../iniciarBases");


function socketproductos (io){
    io.on("connection", async (socket) => {
        console.log("usuarios conectado a productos");
    
        socket.emit("productos", await iniciarBases.productContainer.getElements()); //envio productos
    
        //al recibir un producto guardo y lo muestro
        socket.on("CargarProducto", async (data) => {
            await iniciarBases.productContainer.save(data);
            io.sockets.emit("productos", await iniciarBases.productContainer.getElements());
        });
    });
}

module.exports = socketproductos;