// locales/en.js
module.exports = {
  // LOGIN GENERAL
  emailNotFound: "Email not found",
  incorrectPassword: "Incorrect password",
  loginFailed: "Login failed",

  // RENEW TOKEN
  tokenRenewalFailed: "Failed to renew token",

  // VALIDATIONS TO AUTHENTICATION
  emailRequired: "Email is required",
  emailInvalid: "Email must be a valid email address",
  passwordRequired: "Password is required",

  // MIDDLEWARE TOKEN EXISTS
  tokenNotProvided: "Token not provided",
  invalidOrExpiredToken: "Invalid or expired token",

  //GENERL MESSAGES COMPANIES
  companyExists: "The company already exists",
  companyCreated: "Company created successfully",
  errorCreatingCompany: "Error creating company",
  companiesRetrieved: "Companies retrieved successfully",
  noCompaniesFound: "No companies found",
  errorFetchingCompanies: "Error fetching companies",
  companyNotFound: "Company not found",
  multitenantMiddlewareError: "Multitenant middleware error",

  // VALIDATIONS TO CREATE COMPANIES
  nameRequired: "Name is required",
  nameString: "Name must be a string",
  legalNameRequired: "Legal name is required",
  legalNameString: "Legal name must be a string",
  dbNameRequired: "Database name is required",
  dbNameString: "Database name must be a string",
  statusInvalid: 'Status must be "active" or "inactive"',
};
