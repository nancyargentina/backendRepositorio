class Usuario{
    constructor(unNombre, unApellido,listaLibros,listaMascotas) {
        this.nombre = unNombre,
        this.apellido = unApellido,
        this.libros = listaLibros,
        this.mascotas = listaMascotas
    }
    get fullName(){
        return `${this.nombre} ${this.apellido}`;
    }
    addMascota(unaMascota){
        this.mascotas.push(unaMascota);
    }
    countMascotas(){
        return this.mascotas.length;
    }
    addBook(titulo,autor){
        this.libros.push( {titulo, autor} );
    }
    getBookNames(){
        return this.libros.map((libro) => libro.titulo );
    }
}

const usuario = new Usuario ('Carolina','Martinez',[],[]);
console.log('nombre',usuario.fullName);
console.log('cantidad de mascotas',usuario.countMascotas());
usuario.addMascota('miPerrito');
console.log('cantidad de mascotas luego de agregar',usuario.countMascotas());
usuario.addBook('Rosaura a las diez','Marco Denevi');
usuario.addBook('Cuentos de Andersen','Hans Christian Andersen');
console.log('nombres de libros',usuario.getBookNames());


