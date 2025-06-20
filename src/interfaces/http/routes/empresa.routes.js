const express = require("express");
const router = express.Router();

const EmpresaController = require("../controllers/EmpresaController");
const auth = require("../middlewares/auth.middleware");

const { validateCreateEmpresa } = require("../validations/empresa.validation");
const validateFields = require("../middlewares/validateFields");

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
  "/",
  auth,
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
router.get("/", auth, EmpresaController.getAll);

/**
 * @swagger
 * /api/v1/empresas/{id}:
 *   get:
 *     summary: Obtener una empresa por ID
 *     tags: [Empresas]
 *     security:
 *       - XTokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la empresa
 *         schema:
 *           type: string
 *           example: 60b8d295f1b2c4312c8d4a9f
 *     responses:
 *       200:
 *         description: Empresa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 nombre:
 *                   type: string
 *                 direccion:
 *                   type: string
 *       404:
 *         description: Empresa no encontrada
 *       400:
 *         description: Error en la solicitud
 *       401:
 *         description: Token inválido o no enviado
 */
router.get("/:id", auth, EmpresaController.getById);

/**
 * @swagger
 * /api/v1/empresas/{id}:
 *   put:
 *     summary: Actualizar una empresa existente
 *     tags: [Empresas]
 *     security:
 *       - XTokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la empresa a actualizar
 *         schema:
 *           type: string
 *           example: 60b8d295f1b2c4312c8d4a9f
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Empresa XYZ S.A. de C.V.
 *               direccion:
 *                 type: string
 *                 example: Av. Reforma 456, Zona Centro
 *     responses:
 *       200:
 *         description: Empresa actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 nombre:
 *                   type: string
 *                 direccion:
 *                   type: string
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Empresa no encontrada
 *       401:
 *         description: Token inválido o no enviado
 */

router.put("/:id", auth, EmpresaController.update);

/**
 * @swagger
 * /api/v1/empresas/{id}/activar:
 *   put:
 *     summary: Activar una empresa existente
 *     tags: [Empresas]
 *     security:
 *       - XTokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la empresa a activar
 *     responses:
 *       200:
 *         description: Empresa activada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Empresa activada correctamente
 *       404:
 *         description: Empresa no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Empresa no encontrada para activar
 *       400:
 *         description: Error al activar la empresa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.put('/:id/activar', auth, EmpresaController.activarEmpresa);
/**
 * @swagger
 * /api/v1/empresas/{id}/desactivar:
 *   put:
 *     summary: Desactivar una empresa existente
 *     tags: [Empresas]
 *     security:
 *       - XTokenAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la empresa a desactivar
 *     responses:
 *       200:
 *         description: Empresa desactivada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Empresa desactivada correctamente
 *       404:
 *         description: Empresa no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Empresa no encontrada para eliminar
 *       400:
 *         description: Error al desactivar la empresa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put("/:id/desactivar", auth, EmpresaController.desactivarEmpresa);


module.exports = router;
