const { body } = require('express-validator');
const { t } = require('../../../utils/translator');

const validateCreateCompany = (lang = 'en') => [
  body('name')
    .notEmpty().withMessage(t('nameRequired', lang))
    .isString().withMessage(t('nameString', lang)),
  body('legalName')
    .notEmpty().withMessage(t('legalNameRequired', lang))
    .isString().withMessage(t('legalNameString', lang)),
  body('databaseName')
    .notEmpty().withMessage(t('dbNameRequired', lang))
    .isString().withMessage(t('dbNameString', lang)),
  body('status')
    .optional()
    .isIn(['active', 'inactive']).withMessage(t('statusInvalid', lang)),
];

module.exports = {
  validateCreateCompany,
};
