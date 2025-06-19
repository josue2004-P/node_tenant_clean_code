const mongoose = require('mongoose');
const connectToTenantDB = require('../config/database/config');
const UsuarioSchema = require('../models/Usuario');
const EmpresaSchema = require('../models/Empresa');

const globalConnections = {};

module.exports = async (req, res, next) => {
  const host = req.hostname;
  const subdominio = host.split('.')[0].toLowerCase();

  try {
    if (subdominio === 'localhost' || subdominio === 'admin') {
      // Conectar a admin_db
      if (!globalConnections.admin) {
        const uri = process.env.MONGO_URI.replace('/?', `/admin_db?`);
        const conn = await mongoose.createConnection(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        globalConnections.admin = conn;
        globalConnections.Usuario = conn.model('Usuario', UsuarioSchema);
        globalConnections.Empresa = conn.model('Empresa', EmpresaSchema);
      }

      req.db = globalConnections.admin;
      req.Usuario = globalConnections.Usuario;
      req.Empresa = globalConnections.Empresa;
      return next();
    }

    // Verificar si existe la empresa en admin_db
    const adminUri = process.env.MONGO_URI.replace('/?', `/admin_db?`);
    const adminConn = await mongoose.createConnection(adminUri);
    const Empresa = adminConn.model('Empresa', EmpresaSchema);
    const empresa = await Empresa.findOne({ nombre: subdominio });

    if (!empresa) return res.status(404).json({ error: 'Empresa no encontrada' });

    // Conectar a base del tenant
    const conn = await connectToTenantDB(subdominio);
    req.db = conn;
    req.Usuario = conn.model('Usuario', UsuarioSchema);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en middleware multitenant');
  }
};
