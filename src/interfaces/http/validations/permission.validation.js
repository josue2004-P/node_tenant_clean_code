const { body } = require("express-validator");
const { t } = require("../../../utils/translator");

const validateCreatePermission = (lang = "en") => [
  body("name")
    .notEmpty()
    .withMessage(t("nameRequiredPermission", lang))
    .isString()
    .withMessage(t("nameStringPermission", lang)),
  body("description")
    .notEmpty()
    .withMessage(t("descriptionRequiredPermission", lang))
    .isString()
    .withMessage(t("descriptionStringPermission", lang)),
];

module.exports = {
  validateCreatePermission,
};
