const { body } = require('express-validator');

const validateCreateCompany = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isString().withMessage('El nombre debe ser texto'),
  body('razonSocial')
    .notEmpty().withMessage('La razón social es obligatoria')
    .isString().withMessage('La razón social debe ser texto'),
  body('databaseName')
    .notEmpty().withMessage('El nombre de la base de datos es obligatorio')
    .isString().withMessage('El nombre de la base de datos debe ser texto'),
  body('estatus')
    .optional()
    .isIn(['activa', 'inactiva']).withMessage('El estatus debe ser "activa" o "inactiva"'),
];

module.exports = {
  validateCreateCompany,
};
