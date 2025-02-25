/*  This is responsible for displaying, updating, editing, items 
    Both, Customers LoggedOut and LoggedIn can see items
*/
import express from "express";
import AuthMiddleware from "../middleware/auth-middleware.js";
import CategoriesModel from "../models/categories.js";
import ItemCategoriesController from "../controllers/ItemCategoriesController.js";

const ItemRouter = express.Router();
const itemCategoriesController = new ItemCategoriesController(CategoriesModel);

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
 *               - categoryName
 *             properties:
 *               categoryName:
 *                 type: string
 *                 description: The name of the category to be created.
 *                 example: "Men's T-Shirts"
 *               imageURL:
 *                 type: string
 *                 description: URL of an image to be displayed for this category
 *                 example: "https://cdn.pixabay.com/photo/2014/08/26/21/49/jackets-428622_1280.jpg"
 *               items:
 *                 type: array
 *                 itemID:
 *                   type: string
 *                   format: uuid
 *                 description: List of item IDs that belong to this category (Items need to exist first)
 *                 example: ["67bd14d7e13b0d81ae113f85", "67bd152ce13b0d81ae113f88"]
 *     responses:
 *       200:
 *         description: Category created successfully
 *       400:
 *         description: Bad Request - Invalid input
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
ItemRouter.post("/create-category", AuthMiddleware.checkIfAdmin, async (req, res) => {
    try {
        const categoryName = req.body.categoryName;
        const itemsList = req.body.items;
        const imageURL = req.body.imageURL;
        const response = await itemCategoriesController.addNewCategory(categoryName, imageURL, itemsList);

        if (response.code == 200) {
            return res.status(response.code).json({
                msg: response.msg
            })
        }
        else {
            return res.status(response.code).json({
                error: response.error
            })
        }
    }
    catch (e) {
        return res.status(500).json({
            error: "Server completely failed to create a category",
            rawError: `${e}`,
        });
    }
});

export default ItemRouter;