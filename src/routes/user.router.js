const express = require('express');
const userController = require('../controllers/user.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');

const router = express.Router();

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: User login
 *     description: User login by providing credentials
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         description: Enter username
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         description: Entern password
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: User login success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Response status
 *                   enum: [success]
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 */
router
    .route('/')
    .get(userController.login)
    .all(methodNotAllowed);

/**
 * @swagger
 * /api/user/logout:
 *   get:
 *     summary: User logout
 *     description: Logs out the user by ending their session
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Response status
 *                   enum: [success]
 */
router
    .route('/logout')
    .get(userController.logout)
    .all(methodNotAllowed);

/**
 * @swagger
 * /api/user/session:
 *   get:
 *     summary: Get user session
 *     description: Retrieves the current user session details
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: The current session details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Response status
 *                   enum: [success]
 *                 data:
 *                   type: object
 *                   properties:
 *                     session:
 *                       $ref: '#/components/schemas/Session'
 */
router
    .route('/session')
    .get(userController.getSession)
    .all(methodNotAllowed);

module.exports = router;
