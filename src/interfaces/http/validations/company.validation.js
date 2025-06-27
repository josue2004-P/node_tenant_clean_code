const { body } = require('express-validator');

const validateCreateCompany = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),
  body('legalName')
    .notEmpty().withMessage('Legal name is required')
    .isString().withMessage('Legal name must be a string'),
  body('databaseName')
    .notEmpty().withMessage('Database name is required')
    .isString().withMessage('Database name must be a string'),
  body('status')
    .optional()
    .isIn(['active', 'inactive']).withMessage('Status must be "active" or "inactive"'),
];

module.exports = {
  validateCreateCompany,
};
