const { body } = require("express-validator");
const { t } = require('../../../utils/translator');

const validateLoginUser = (lang = 'en') => [
  body("email")
    .notEmpty()
    .withMessage(t("emailRequired", lang))
    .isEmail()
    .withMessage(t("emailInvalid", lang)),

  body("password")
    .notEmpty()
    .withMessage(t("passwordRequired", lang)),
];

module.exports = {
  validateLoginUser,
};
