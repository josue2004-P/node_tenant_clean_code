const bcrypt = require('bcryptjs');
const connectMySQL = require('../connection');

const crearUsuario = async (data) => {
  const db = await connectMySQL();
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const [result] = await db.query(
    `INSERT INTO usuarios (nombre, apellidoPaterno, apellidoMaterno, usuario, email, password, imagen)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.nombre,
      data.apellidoPaterno,
      data.apellidoMaterno,
      data.usuario,
      data.email,
      hashedPassword,
      data.imagen || null,
    ]
  );

  return { id: result.insertId, ...data, password: undefined };
};

const buscarPorUsuario = async (usuario) => {
  const db = await connectMySQL();
  const [rows] = await db.query(`SELECT * FROM usuarios WHERE usuario = ?`, [usuario]);
  return rows[0];
};

const obtenerUsuarios = async () => {
  const db = await connectMySQL();
  const [rows] = await db.query(`SELECT * FROM usuarios`);
  return rows;
};

module.exports = {
  crearUsuario,
  buscarPorUsuario,
  obtenerUsuarios
};
