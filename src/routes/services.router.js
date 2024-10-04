const express = require('express');
const servicesController = require('../controllers/services.controller');
const { methodNotAllowed } = require('../controllers/errors.controller');
const router = express.Router();

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get books by filter
 *     description: Retrieve a list of books filtered by name or author
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by book name
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter by book author
 *     tags:
 *       - books
 *     responses:
 *       200:
 *         description: A list of books
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
 *                     books:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Books'
 *   post:
 *     summary: Add a new book
 *     description: Add a new book to the collection
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Books'
 *     tags:
 *       - books
 *     responses:
 *       201:
 *         description: The newly created book
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
 *                     book:
 *                       $ref: '#/components/schemas/Books'
 *   delete:
 *     summary: Delete all books
 *     description: Remove all books from the collection
 *     tags:
 *       - books
 *     responses:
 *       200:
 *         description: Status of the operation
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
    .route('/')
    .get(servicesController.getBooksByFilter)
    .post(servicesController.addBook)
    .delete(servicesController.deleteAllBooks)
    .all(methodNotAllowed);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Get a book by ID
 *     description: Retrieve details of a book by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the book
 *     tags:
 *       - books
 *     responses:
 *       200:
 *         description: A book object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Books'
 *   put:
 *     summary: Update a book
 *     description: Update the details of an existing book by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Books'
 *     tags:
 *       - books
 *     responses:
 *       200:
 *         description: The updated book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Books'
 *   delete:
 *     summary: Delete a book by ID
 *     description: Remove a book from the collection by its unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the book
 *     tags:
 *       - books
 *     responses:
 *       200:
 *         description: Status of the deletion
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
    .route('/:id')
    .get(servicesController.getBook)
    .put(servicesController.updateBook)
    .delete(servicesController.deleteBook)
    .all(methodNotAllowed);

module.exports = router;
