const socket = io()

socket.on("msn_send",(data)=>{
    mostrar(data);
})

//muestro los mensajes formateados para el html
const mostrar = (data)=>{
    let html= data.map( x=>{
        let ahora= new Date(x.fecha);
    return `<p><font class="text-primary alert-link">${x.correo}</font>
                [<font color="#835C3B">${ahora.getDate()}/${ahora.getMonth()}/${ahora.getFullYear()} ${ahora.getHours()}:${ahora.getMinutes()}:${ahora.getSeconds()}
                </font>]<font color="green" style= "italic">:${x.msn}</font></p>`
    }).join(" ");
    document.querySelector("#mensajes").innerHTML= html;
}

socket.on("productos",(data)=>{
    mostrarProductos(data);
})

const mostrarProductos=(data)=>{
    //console.log("mostrar productos",data)
    let filas = data.map(x=>{
        return `<tr>
        <td>${x.title}</td>
        <td> ${(x.price /100) }</td>
        <td><img src=${x.thumbnail} /></td>
    </tr>`
    }).join(" ");
    console.log(document.getElementById("#productos"))
    document.getElementById("listaProductos").innerHTML= filas;
}

//guardo la info del msn de chat enviado
const EnviaMensaje =()=>{
    event.preventDefault();
    let ahora= Date.now();
    let unMensaje={
        correo: document.getElementById("correo").value,
        fecha: ahora,
        msn: document.getElementById("msn").value
    };
    //envio mensaje de chat al Server
    socket.emit("mensaje_chat",unMensaje);

    document.getElementById("correo").value= unMensaje.correo;
    document.getElementById("msn").value= "";
    return false;
}
