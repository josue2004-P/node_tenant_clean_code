// src/interfaces/graphql/middlewares/tenant.graphql.js
const { t } = require("../../../utils/translator");
const defaultLang = require("../../../config/lang");

const mongoose = require("mongoose");
const connectToTenantDB = require("../../../config/database/config");

// Schemas
const CompanySchema = require("../../../domain/models/Company");
const UserSchema = require("../../../domain/models/User");
// Add more schemas here if needed

const globalConnections = {};

function registerModels(conn) {
  return {
    Company: conn.models.Company || conn.model("Company", CompanySchema),
    User: conn.models.User || conn.model("User", UserSchema),
    // Register more models here
  };
}

module.exports = async function getTenantModels(req) {
  const host = req.hostname;
  const subdomain = host.split(".")[0].toLowerCase();

  // Handle admin or localhost
  if (subdomain === "localhost" || subdomain === "admin") {
    if (!globalConnections.admin) {
      const uri = process.env.MONGO_URI.replace("/?", `/admin_db?`);
      const conn = await mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      globalConnections.admin = {
        conn,
        ...registerModels(conn),
      };
    }

    return globalConnections.admin;
  }

  // Return cached connection if exists
  if (globalConnections[subdomain]) {
    return globalConnections[subdomain];
  }

  // Connect to admin DB to find the company
  const adminUri = process.env.MONGO_URI.replace("/?", `/admin_db?`);
  const adminConn = await mongoose.createConnection(adminUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const AdminCompany = adminConn.model("Company", CompanySchema);
  const company = await AdminCompany.findOne({ name: subdomain });

  if (!company) throw new Error(t("companyNotFound", defaultLang));

  // Connect to tenant DB
  const tenantConn = await connectToTenantDB(subdomain);
  const models = registerModels(tenantConn);

  globalConnections[subdomain] = {
    conn: tenantConn,
    ...models,
  };

  return globalConnections[subdomain];
};
