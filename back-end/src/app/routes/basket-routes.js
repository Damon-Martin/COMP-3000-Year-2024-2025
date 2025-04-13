import express from "express";

import BasketController from "../controllers/basketController.js";
import BasketModel from "../models/basket.js";

const BasketRouter = express.Router();

const basketController = new BasketController(BasketModel);

BasketRouter.post("/get-items", async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(400).json({ error: "No token provided. Token is needed to auth and contains the username" });
    }

    res.send(token);
})


/**
 * @swagger
 * /v1/basket/add-items:
 *   post:
 *     summary: Add client items with server items
 *     description: Gets current item and items from local storage. Then appends them to the items on the server of that user based on their token.
 *     tags:
 *       - BasketController
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newItem:
 *                 type: object
 *                 required:
 *                   - id
 *                   - name
 *                   - price
 *                   - description
 *                   - imageUrl
 *                   - altImgTxt
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "67faa58d12f175d8d6240188"
 *                   name:
 *                     type: string
 *                     example: "Grey Hoodie"
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 19.99
 *                   description:
 *                     type: string
 *                     example: "A trendy hoodie suitable for teens and adults"
 *                   imageUrl:
 *                     type: string
 *                     format: uri
 *                     example: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Man_Hoodie_Salamanca_%28Unsplash%29.jpg"
 *                   altImgTxt:
 *                     type: string
 *                     example: "Image of a Grey Hoodie"
 *               clientItems:
 *                 type: array
 *                 description: List of existing client items
 *                 items:
 *                   type: object
 *                   required:
 *                     - id
 *                     - name
 *                     - price
 *                     - description
 *                     - imageUrl
 *                     - altImgTxt
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                       format: float
 *                     description:
 *                       type: string
 *                     imageUrl:
 *                       type: string
 *                       format: uri
 *                     altImgTxt:
 *                       type: string
 *           example:
 *             newItem:
 *               id: "67faa58d12f175d8d6240188"
 *               name: "Grey Hoodie"
 *               price: 19.99
 *               description: "A trendy hoodie suitable for teens and adults"
 *               imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Man_Hoodie_Salamanca_%28Unsplash%29.jpg"
 *               altImgTxt: "Image of a Grey Hoodie"
 *             clientItems:
 *               - id: "67faa58d12f175d8d6240123"
 *                 name: "Red Hoodie"
 *                 price: 24.99
 *                 description: "A bold red hoodie"
 *                 imageUrl: "https://example.com/red-hoodie.jpg"
 *                 altImgTxt: "Image of a Red Hoodie"
 *               - id: "67faa58d12f175d8d6240456"
 *                 name: "Blue Hoodie"
 *                 price: 21.50
 *                 description: "A stylish blue hoodie"
 *                 imageUrl: "https://example.com/blue-hoodie.jpg"
 *                 altImgTxt: "Image of a Blue Hoodie"
 *     responses:
 *       200:
 *         description: Items synced successfully
 *       400:
 *         description: No token provided or invalid request
 *       500:
 *         description: Internal server error
 */
BasketRouter.post("/add-items", async (req, res) => {
    const token = req.headers.authorization;
    const clientItems = req.body.clientItems;
    const newItem = req.body.newItem;

    const response = await basketController.addItems(token, newItem, clientItems);

    if (response.code != 200) {
        res.status(response.code).json({
            error: response.error
        })
    }
    else {
        res.status(200).json({
            msg: "Successfully added items to basket"
        })
    }
})

export default BasketRouter;