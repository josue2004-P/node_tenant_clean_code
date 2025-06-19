const express = require('express');
const router = express.Router();

const EmpresaController = require('../controllers/EmpresaController');
const jwt = require('../middlewares/auth.middleware');

const { validateCreateEmpresa } = require('../validations/empresa.validation');
const validateFields = require('../middlewares/validateFields');

/**
 * @swagger
 * tags:
 *   name: Empresas
 *   description: Endpoints para la gestión de empresas
 */

/**
 * @swagger
 * /api/v1/empresas:
 *   post:
 *     summary: Crear una nueva empresa
 *     tags: [Empresas]
 *     security:
 *       - XTokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - direccion
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Empresa ABC S.A. de C.V.
 *               direccion:
 *                 type: string
 *                 example: Calle 123, Ciudad Industrial
 *     responses:
 *       201:
 *         description: Empresa creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 60b8d295f1b2c4312c8d4a9f
 *                 nombre:
 *                   type: string
 *                 direccion:
 *                   type: string
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token inválido o no enviado
 */
router.post(
  '/',
  jwt,
  validateCreateEmpresa,
  validateFields,
  EmpresaController.create
);

/**
 * @swagger
 * /api/v1/empresas:
 *   get:
 *     summary: Obtener todas las empresas
 *     tags: [Empresas]
 *     security:
 *       - XTokenAuth: []
 *     responses:
 *       200:
 *         description: Lista de empresas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 60b8d295f1b2c4312c8d4a9f
 *                   nombre:
 *                     type: string
 *                     example: Empresa ABC S.A. de C.V.
 *                   direccion:
 *                     type: string
 *                     example: Calle 123, Ciudad Industrial
 *       401:
 *         description: Token inválido o no enviado
 */
router.get('/', jwt, EmpresaController.getAll);

module.exports = router;
