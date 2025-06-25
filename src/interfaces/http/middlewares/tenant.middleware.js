const mongoose = require('mongoose');
const connectToTenantDB = require('../../../infrastructure/mongo/config.tenant.mongo');
const UsuarioSchema = require('../../../infrastructure/mongo/schemas/UsuarioSchema');
const EmpresaSchema = require('../../../infrastructure/mongo/schemas/EmpresaSchema'); // Aplica igual

const globalConnections = {};

module.exports = async (req, res, next) => {
  const host = req.hostname;
  const subdominio = host.split('.')[0].toLowerCase();

  try {
    if (subdominio === 'localhost' || subdominio === 'admin') {
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

    // Buscar empresa en admin_db
    const adminUri = process.env.MONGO_URI.replace('/?', `/admin_db?`);
    const adminConn = await mongoose.createConnection(adminUri);
    const Empresa = adminConn.model('Empresa', EmpresaSchema);
    const empresa = await Empresa.findOne({ nombre: subdominio });

    if (!empresa) return res.status(404).json({ error: 'Empresa no encontrada' });

    // Conectar tenant
    const conn = await connectToTenantDB(subdominio);
    req.db = conn;
    req.Usuario = conn.model('Usuario', UsuarioSchema);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en middleware multitenant');
  }
};
