class Usuario {
  constructor({
    id,
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    usuario,
    email,
    imagen,
    inactivo,
    fechaCreacion,
    fechaActualizacion
  }) {
    this.id = id;
    this.nombre = nombre;
    this.apellidoPaterno = apellidoPaterno;
    this.apellidoMaterno = apellidoMaterno;
    this.usuario = usuario;
    this.email = email;
    this.imagen = imagen;
    this.inactivo = inactivo;
    this.fechaCreacion = fechaCreacion;
    this.fechaActualizacion = fechaActualizacion;
  }
}

module.exports = Usuario;
