const express = require("express");
const router = express.Router();

const CompanyController = require("../../controllers/CompanyController");
const authentication = require("../../middlewares/authentication.middleware");

const {
  validateCreateCompany,
} = require("../../validations/company.validation");
const validateFields = require("../../middlewares/validateFields");

/**
 * @swagger
 * tags:
 *   name: Empresas
 *   description: Endpoints para la gestión de empresas
 */

router.post(
  "/",
  authentication,
  validateCreateCompany("es"), // 👈 aquí fijas el idioma ('es' o 'en')
  validateFields,
  CompanyController.create
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
router.get("/", authentication, CompanyController.getAll);

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
router.get("/:id", authentication, CompanyController.getById);

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

router.put("/:id", authentication, CompanyController.update);

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

router.put("/:id/activate", authentication, CompanyController.activateCompany);
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
router.put(
  "/:id/deactivate",
  authentication,
  CompanyController.deactivateCompany
);

module.exports = router;
