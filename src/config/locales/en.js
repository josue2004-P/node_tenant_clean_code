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
  companyUpdated: "Company updated successfully",

  errorCreatingCompany: "Error creating company",
  errorUpdatingCompany: "Error updating company",

  companiesRetrieved: "Companies retrieved successfully",
  noCompaniesFound: "No companies found",
  errorFetchingCompanies: "Error fetching companies",
  errorFetchingCompany: "Error fetching company",
  companyNotFound: "Company not found",
  multitenantMiddlewareError: "Multitenant middleware error",
  invalidObjectId: "Invalid ID provided for company",
  noCompanyFound: "Company not found",
  companyModelMissing: "Company model is missing. Operation not allowed",

  companyActivated: "Company successfully activated",
  companyDeactivated: "Company successfully deactivated",

  companyAlreadyActive: "Company is already active",
  companyAlreadyInactive: "Company is already inactive",

  errorActivatingCompany: "Error activating company",
  errorDeactivatingCompany: "Error deactivating company",

  // VALIDATIONS TO CREATE COMPANIES
  nameRequiredCompany: "Name is required",
  nameStringCompany: "Name must be a string",
  legalnameRequiredCompany: "Legal name is required",
  legalnameStringCompany: "Legal name must be a string",
  dbnameRequiredCompany: "Database name is required",
  dbnameStringCompany: "Database name must be a string",
  statusInvalid: 'Status must be "active" or "inactive"',
  
  //GENERL MESSAGES USERS
  errorCreatingUser: "Error creating user",
  userCreated: "User created successfully",

  // VALIDATIONS TO CREATE USERS
  firstNameRequiredUser: "First name is required",
  firstNameStringUser: "First name is required",
  lastNameRequiredUser: "Last name is required",
  lastNameStringUser: "Last name is required",
  middleNameRequiredUser: "Middle name is required",
  middleNameStringUser: "Middle name is required",
  usernameRequired: "Username is required",
  usernameString: "Username is required",

  emailExists: "The email already exists",
  usernameExists: "The username already exists",
  usersRetrieved: "Users retrieved successfully",
  noUserFond: "No users found",
  errorFetchingUsers: "Error fetching users",

};
