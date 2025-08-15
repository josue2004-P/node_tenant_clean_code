const { body } = require('express-validator');
const { t } = require('../../../utils/translator');

const validateCreateCompany = (lang = 'en') => [
  body('name')
    .notEmpty().withMessage(t('nameRequiredCompany', lang))
    .isString().withMessage(t('nameStringCompany', lang)),
  body('legalName')
    .notEmpty().withMessage(t('legalnameRequiredCompany', lang))
    .isString().withMessage(t('legalnameStringCompany', lang)),
  body('databaseName')
    .notEmpty().withMessage(t('dbnameRequiredCompany', lang))
    .isString().withMessage(t('dbnameStringCompany', lang)),
  body('status')
    .optional()
    .isIn(['active', 'inactive']).withMessage(t('statusInvalid', lang)),
];

module.exports = {
  validateCreateCompany,
};
