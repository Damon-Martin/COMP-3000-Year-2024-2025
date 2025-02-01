/*  This is responsible for displaying, updating, editing, items 
    Both, Customers LoggedOut and LoggedIn can see items
*/
import express from "express";
import AuthMiddleware from "../middleware/auth-middleware.js";

const ItemRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /v1/items/all-categories:
 *   get:
 *     summary: Retrieves all categories
 *     description: Returns a list of all categories
 *     tags:
 *       - ItemController 
 */
ItemRouter.get('/all-categories', (req, res) => {
    res.send('Hello World!')
})

/**
 * @swagger
 * /v1/items/all-categories-by-category:
 *   get:
 *     summary: Retrieves all items based on requested categories
 *     description: Requests a JSON obj of all items based on requested categories by querieing the DB
 *     tags:
 *       - ItemController 
 */
ItemRouter.get('/all-items-by-category', (req, res) => {
    res.send('Hello World!')
})


/**
 * @swagger
 * /v1/items/create-category:
 *   post:
 *     summary: Creates a new item category
 *     description: Creates a new category for items in the database. Requires JWT authentication.
 *     tags:
 *       - ItemController
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category created successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
ItemRouter.post("/create-category", AuthMiddleware.checkIfAdmin, async (req, res) => {
    res.send('Hello World!');
});

export default ItemRouter;