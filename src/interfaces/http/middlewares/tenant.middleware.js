const mongoose = require("mongoose");
const connectToTenantDB = require("../../../infrastructure/mongo/config.tenant.mongo");
const UserSchema = require("../../../infrastructure/mongo/schemas/UserSchema");
const CompanySchema = require("../../../infrastructure/mongo/schemas/CompanySchema");

const { t } = require("../../../utils/translator");
const defaultLang = require("../../../config/lang");

const globalConnections = {};

module.exports = async (req, res, next) => {
  const host = req.hostname;
  const subdomain = host.split(".")[0].toLowerCase();

  try {
    if (subdomain === "localhost" || subdomain === "admin") {
      if (!globalConnections.admin) {
        const uri = process.env.MONGO_URI.replace("/?", `/admin_db?`);
        const conn = await mongoose.createConnection(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        globalConnections.admin = conn;
        globalConnections.User = conn.model("User", UserSchema);
        globalConnections.Company = conn.model("Company", CompanySchema);
      }

      req.db = globalConnections.admin;
      req.User = globalConnections.User;
      req.Company = globalConnections.Company;
      return next();
    }

    // Search company in admin_db
    const adminUri = process.env.MONGO_URI.replace("/?", `/admin_db?`);
    const adminConn = await mongoose.createConnection(adminUri);
    const Company = adminConn.model("Company", CompanySchema);
    const company = await Company.findOne({ name: subdomain });

    if (!company)
      return res.status(404).json({ error: t("companyNotFound", defaultLang) });

    // Connect to tenant DB
    const conn = await connectToTenantDB(subdomain);
    req.db = conn;
    req.User = conn.model("User", UserSchema);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send(t("multitenantMiddlewareError", defaultLang));
  }
};
