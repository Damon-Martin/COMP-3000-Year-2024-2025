/*  This is responsible for displaying, updating, editing, items 
    Both, Customers LoggedOut and LoggedIn can see items
*/
import express from "express";
import AuthMiddleware from "../middleware/auth-middleware.js";
import CategoriesModel from "../models/categories.js";
import ItemsModel from "../models/items.js";
import ItemCategoriesController from "../controllers/ItemCategoriesController.js";

const ItemRouter = express.Router();
const itemCategoriesController = new ItemCategoriesController(CategoriesModel, ItemsModel);

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
 * /v1/items:
 *   get:
 *     summary: Returns Item based by ID
 *     description: Retrieves an item from the item collection by using Mongoose
 *     tags:
 *       - ItemController
 *     parameters:
 *       - name: ItemID
 *         in: query
 *         description: ID of the item to filter the categories
 *         required: false
 *         schema:
 *           type: string
 *           example: 67f6a1b7c02fe16921544ca8
 *     responses:
 *       200:
 *         description: List of all Category Retrieved successfully
 *       500:
 *         description: Internal server error
 */
ItemRouter.get('/', async (req, res) => {
    try {
        const { ItemID } = req.query;

        const response = await itemCategoriesController.getItemByID(ItemID);
        
        if (response.code == 200) {
            return res.status(response.code).json({
                item: response.item
            })
        }
        else if (response.code) {
            return res.status(response.code).json({
                error: response.error
            })
        }
        else {
            return res.status(500).json({
                error: "Missing a response code from getItemByID but it ran"
            });
        }
    }
    catch (e) {
        return res.status(500).json({
            error: "Failed Completely to run any logic for getItemByID and is at final catch block"
        })
    }
})

/**
 * @swagger
 * /v1/items/sorted-by-popularity:
 *   get:
 *     summary: Returns all Items sorted by popularity
 *     description: Retrieves all Items from the database and orders them by items sold in decending order.
 *     tags:
 *       - ItemController
 *     responses:
 *       200:
 *         description: List of all Items sorted by popularity or Empty if no items are available
 *       500:
 *         description: Internal server error
 */
ItemRouter.get('/sorted-by-popularity', async (req, res) => {
    try {
        const response = await itemCategoriesController.getAllItemsByPopularity();

        if (response.code == 200) {
            return res.status(response.code).json({
                items: response.items
            })
        } 
        else if (response.code) {
            return res.status(response.code).json({
                error: response.error
            })
        } 
        else {
            return res.status(500).json({
                error: "Missing a response code from getAllItemsOrderedByPrice"
            });
        }
    } catch (e) {
        return res.status(500).json({
            error: "Failed completely to run any logic for getAllItemsOrderedByPrice"
        });
    }
});


/**
 * @swagger
 * /v1/items/all-categories:
 *   get:
 *     summary: Returns all category details (Not Items in the category)
 *     description: Retrieves a list of all category names and their images
 *     tags:
 *       - ItemController 
 *     responses:
 *       200:
 *         description: List of all Category Retrieved successfully
 *       500:
 *         description: Internal server error
 */
ItemRouter.get('/all-categories', async (req, res) => {
    try {
        const response = await itemCategoriesController.getListOfCategories();
        
        if (response.code == 200) {
            return res.status(response.code).json({
                msg: response.msg,
                categories: response.categories
            })
        }
        else if (response.code) {
            return res.status(response.code).json({
                error: response.error
            })
        }
        else {
            return res.status(500).json({
                error: "Missing a response code from getListOfCategries but it ran"
            });
        }
    }
    catch (e) {
        return res.status(500).json({
            error: "Failed Completely to run any logic for /all-categories and is at final catch block"
        })
    }
})

/**
 * @swagger
 * /v1/items/all-items-by-categoryID:
 *   get:
 *     summary: Retrieves all items based on requested category
 *     description: Returns the category name and all items filtered by categoryID
 *     tags:
 *       - ItemController 
 *     parameters:
 *       - in: query
 *         name: categoryID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to fetch items for
 *     responses:
 *       200:
 *         description: Successfully retrieved items for the given category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 categoryName:
 *                   type: string
 *                   description: Name of the category
 *                 msg:
 *                   type: string
 *                   description: Descriptive message
 *                 items:
 *                   type: array
 *                   description: Array of items in the category
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                         description: Item name
 *                       imageUrl:
 *                         type: string
 *                         description: URL of the item image
 *                       altImgTxt:
 *                         type: string
 *                         description: Alt image text
 *                       price:
 *                         type: number
 *                         description: Price of the item
 *                       description:
 *                         type: string
 *                         description: Description of the item
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
ItemRouter.get('/all-items-by-categoryID', async (req, res) => {
    try {
        const categoryID = req.query.categoryID;
        const response = await itemCategoriesController.getItemsByCategoryID(categoryID);
        
        if (response.code == 200) {
            return res.status(response.code).json({
                categoryName: response.categoryName,
                msg: response.msg,
                items: response.items
            })
        }
        else if (response.code) {
            return res.status(response.code).json({
                error: response.error
            })
        }
        else {
            return res.status(500).json({
                error: "Missing a response code from getListOfCategries but it ran"
            });
        }
    }
    catch (e) {
        return res.status(500).json({
            error: "Failed Completely to run any logic for /all-categories and is at final catch block"
        })
    }
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
 *               altImgTxt:
 *                 type: string
 *                 description: Alt Text for image for screen reader compatibility
 *                 example: Image of a Jacket
 *               items:
 *                 type: array
 *                 itemID:
 *                   type: string
 *                   format: uuid
 *                 description: List of item IDs that belong to this category (Needs valid UUID)
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
        const altImgTxt = req.body.altImgTxt;
        const response = await itemCategoriesController.addNewCategory(categoryName, imageURL, altImgTxt, itemsList);

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


/**
 * @swagger
 * /v1/items/:
 *   post:
 *     summary: Creates a new item
 *     description: Using Items Details and a category to insert it into the database. Requires JWT authentication.
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
 *               categoryID:
 *                 type: uuid
 *                 description: The ID of the category to which the item belongs.
 *                 example: "67bd14d7e13b0d81ae113f85"
 *               itemDetails:
 *                 type: object
 *                 properties:
 *                   itemName:
 *                     type: string
 *                     description: Name of the item.
 *                     example: "Leather Jacket"
 *                   imageURL:
 *                     type: string
 *                     description: URL of an image to be displayed for this item.
 *                     example: "https://cdn.pixabay.com/photo/2014/08/26/21/49/jackets-428622_1280.jpg"
 *                   altImgTxt:
 *                     type: string
 *                     description: Alt text for image for screen reader compatibility.
 *                     example: "Image of a leather jacket"
 *                   itemDescription:
 *                     type: string
 *                     description: A detailed description of the item.
 *                     example: "A stylish leather jacket perfect for all seasons."
 *                   price:
 *                     type: number
 *                     format: float
 *                     description: Price of the item.
 *                     example: 99.99
 *     responses:
 *       200:
 *         description: Item created successfully
 *       400:
 *         description: Bad Request - Invalid input
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
ItemRouter.post("/", AuthMiddleware.checkIfAdmin, async (req, res) => {
    try{
        const itemDetails = req.body.itemDetails;
        const categoryID = req.body.categoryID;
    
        const response = await itemCategoriesController.addNewItem(itemDetails, categoryID);

        if (response.code == 200) {
            return res.status(response.code).json({
                msg: response.msg
            })
        }
        else if (response.code) {
            return res.status(response.code).json({
                error: response.error
            })
        }
        else {
            return res.status(500).json({
                error: "Missing Response from itemCategoryController.addNewItem()"
            })
        }
    }
    catch (e) {
        return res.status(500).json({
            error: "Server completely failed to create a new item",
            rawError: `${e}`,
        });
    }
});


/**
 * @swagger
 * /v1/items/search:
 *   get:
 *     summary: Searches for items by query string
 *     description: Returns all items that match the query in their name using regex. tro would find trousers eg.
 *     tags:
 *       - ItemController
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Search term to filter items by name or description
 *         example: "tro"
 *     responses:
 *       200:
 *         description: List of matching items sorted by price
 *       400:
 *         description: Bad request if the search query is empty
 *       500:
 *         description: Internal server error
 */
ItemRouter.get('/search', async (req, res) => {
    try {
        const { query } = req.query;

        // Validate query
        if (!query || query.trim() === "") {
            return res.status(400).json({
                error: "Search query can't be empty"
            });
        }

        // Call the controller method to search items
        const response = await itemCategoriesController.searchItemsByText(query);

        if (response.code === 200) {
            return res.status(response.code).json({
                items: response.items
            });
        } else {
            return res.status(response.code).json({
                error: response.error
            });
        }
    } 
    catch (e) {
        return res.status(500).json({
            error: "Failed to run search logic"
        });
    }
});


export default ItemRouter;