const { body } = require("express-validator");
const { t } = require("../../../utils/translator");

const validateCreateUser = (lang = "en") => [
  body("firstName")
    .notEmpty()
    .withMessage(t("firstNameRequiredUser", lang))
    .isString()
    .withMessage(t("firstNameStringUser", lang)),
  body("lastName")
    .notEmpty()
    .withMessage(t("lastNameRequiredUser", lang))
    .isString()
    .withMessage(t("lastNameStringUser", lang)),
  body("middleName")
    .notEmpty()
    .withMessage(t("middleNameRequiredUser", lang))
    .isString()
    .withMessage(t("middleNameStringUser", lang)),
  body("username")
    .notEmpty()
    .withMessage(t("usernameRequired", lang))
    .isString()
    .withMessage(t("usernameString", lang)),
  body("email")
    .notEmpty()
    .withMessage(t("emailRequired", lang))
    .isEmail()
    .withMessage(t("emailInvalid", lang)),
  body("password").notEmpty().withMessage(t("passwordRequired", lang)),
];

module.exports = {
  validateCreateUser,
};
