const iniciarBases = require("../iniciarBases");


function socketMensajes (io){
    io.on("connection", async (socket) => {
        console.log("usuarios conectado a mensajes");
    
        socket.emit("msn_send", await iniciarBases.msnContainer.getElements()); //envio mensajes de usuarios
    
        //al recibir msj de chat guardo y lo muestro
        socket.on("mensaje_chat", async (data) => {
            await iniciarBases.msnContainer.save(data);
            io.sockets.emit("msn_send", await iniciarBases.msnContainer.getElements());
        });
    });
    
}
module.exports = socketMensajes;
