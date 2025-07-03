/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para autenticación y gestión de tokens
 */

/**
 * @swagger
 * /api/v1/authentication/:
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
 *                 example: ADMINISTRATOR@example.com
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
 *                 user:
 *                   type: object
 *                   properties:
 *                      id:
 *                         type: string
 *                         example: 123456789
 *                      email:
 *                         type: string
 *                         example: email@example.com
 *          
 *       401:
 *         description: |
 *           Fallo de autenticación. Posibles causas:
 *             - Email no encontrado
 *             - Contraseña incorrecta
 *             - Otro error de inicio de sesión
 * 
 * /api/v1/authentication/renew-token:
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
 *                  
 *       401:
 *         description: Token inválido o expirado
 */

// Añade este componente para la autenticación
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
