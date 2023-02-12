function contarRepeticionesAleatorios(cantidad) {
    let numeros = {};
    let numeroAleatorio = () => Math.floor(Math.random() * 1000) + 1;
    for (let i = 0; i < cantidad; i++) {
        let numero = numeroAleatorio();
        if (!numeros[numero]) numeros[numero] = 0;
        numeros[numero]++;
    }
    return numeros;
}
process.on("message", (message) => {
    console.log('iniciando subproceso')
    const listado = contarRepeticionesAleatorios(Number(message));
    process.send(listado);
    console.log('subproceso terminando')
    process.exit();
});
