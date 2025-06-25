class Company {
  constructor({ id, name, businessName, databaseName, status, registrationDate }) {
    this.id = id;
    this.name = name;
    this.businessName = businessName;
    this.databaseName = databaseName;
    this.status = status;
    this.registrationDate = registrationDate;
  }
}

module.exports = Company;
