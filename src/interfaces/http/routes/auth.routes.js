const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const AuthController = require("../controllers/AuthController");

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para autenticación y gestión de tokens
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Iniciar sesión con correo y contraseña
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string 
 *                 format: email
 *                 example: admin@empresa.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", AuthController.login);
/**
 * @swagger
 * /api/v1/auth/renew-token:
 *   get:
 *     summary: Renovar token JWT
 *     tags: [Autenticación]
 *     security:
 *       - XTokenAuth: []
 *     responses:
 *       200:
 *         description: Token renovado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Token inválido o expirado
 */
router.get("/renew-token", auth, AuthController.renewToken);

module.exports = router;
