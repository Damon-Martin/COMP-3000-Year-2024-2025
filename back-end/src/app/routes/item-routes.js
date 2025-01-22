/*  This is responsible for displaying, updating, editing, items 
    Both, Customers LoggedOut and LoggedIn can see items
*/
import express from "express";

const ItemRouter = express.Router();

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

export default ItemRouter;