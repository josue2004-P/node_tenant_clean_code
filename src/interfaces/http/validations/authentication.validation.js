const { body } = require("express-validator");

const validateLoginUser = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),

  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = {
  validateLoginUser,
};
