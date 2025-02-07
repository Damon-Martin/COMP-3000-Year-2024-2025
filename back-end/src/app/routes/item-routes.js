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
 * /v1/items/all-items-by-category:
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
*     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category
 *             properties:
 *               category:
 *                 type: string
 *                 description: The name of the new category to be created.
 *                 example: "Men's T-Shirts"
 *     responses:
 *       200:
 *         description: Category created successfully
 *       400:
 *         description: Bad Request - Missing category in request body
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
ItemRouter.post("/create-category", AuthMiddleware.checkIfAdmin, async (req, res) => {
    try {
        const newCategory = req.body.category;
        if (newCategory == null) {
            return res.status(400).json({
                error: "This endpoint requires a new category using category in the req body"
            });
        }
    
        return res.status(200).json({
            msg: `Added new category successfully: ${newCategory}`
        });
    }
    catch (e) {
        return res.status(500).json({
            error: "Server completely failed to create a category",
            rawError: `${e}`,
        });
    }
});

export default ItemRouter;