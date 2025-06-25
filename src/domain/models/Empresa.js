class Empresa {
  constructor({ id, nombre, razonSocial, databaseName, estatus, fechaRegistro }) {
    this.id = id;
    this.nombre = nombre;
    this.razonSocial = razonSocial;
    this.databaseName = databaseName;
    this.estatus = estatus;
    this.fechaRegistro = fechaRegistro;
  }
}

module.exports = Empresa;
