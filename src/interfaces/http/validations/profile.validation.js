const { body } = require("express-validator");
const { t } = require("../../../utils/translator");

const validateCreateProfile = (lang = "en") => [
  body("name")
    .notEmpty()
    .withMessage(t("", lang))
    .isString()
    .withMessage(t("", lang)),
  body("description")
    .notEmpty()
    .withMessage(t("", lang))
    .isString()
    .withMessage(t("", lang)),
];

module.exports = {
  validateCreateProfile,
};
