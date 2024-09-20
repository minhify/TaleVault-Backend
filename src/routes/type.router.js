const express = require('express');
const bookTypeController = require('../controllers/booktype.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');
const router = express.Router();

/**
 * @swagger
 * /api/v1/booktypes:
 *   get:
 *     summary: Get all book types
 *     description: Retrieve a list of all available book types
 *     tags:
 *       - booktypes
 *     responses:
 *       200:
 *         description: A list of book types
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
 *                     types:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Type'
 */
router
    .route('/')
    .get(bookTypeController.getTypes)
    .all(methodNotAllowed);

/**
 * @swagger
 * /api/v1/booktypes/{id}:
 *   get:
 *     summary: Get a book type by ID
 *     description: Retrieve details of a specific book type by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the book type
 *     tags:
 *       - booktypes
 *     responses:
 *       200:
 *         description: A book type object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Type'
 */
router
    .route('/:id')
    .get(bookTypeController.getTypeById)
    .all(methodNotAllowed);

module.exports = router;
