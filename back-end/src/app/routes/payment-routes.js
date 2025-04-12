import express from "express";

import ItemsModel from "../models/items.js";
import CategoriesModel from "../models/categories.js";
import ItemCategoriesController from "../controllers/ItemCategoriesController.js";


const CLIENT_ID = String(process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_CLIENT_ID);
const CLIENT_SECRET = String(process.env.PAYPAL_SANDBOX_SECRET);
const PAYPAL_URI = 'https://api-m.sandbox.paypal.com';

const itemCategoriesController = new ItemCategoriesController(CategoriesModel, ItemsModel);

const PaymentRouter = express.Router();

// This access token is needed for creating and caputuring orders
async function generateAccessToken() {
    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
        try {
        const response = await fetch(`${PAYPAL_URI}/v1/oauth2/token`, {
            method: 'POST',
            headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials',
        });
    
        if (!response.ok) {
            throw new Error(`Error fetching access token: ${response.statusText}`);
        }
    
        const data = await response.json();
        return data.access_token;
    } 
    catch (e) {
      console.error('Error generating access token:', e);
    }
}


/**
 * @swagger
 * /v1/payments/create-order-single-item:
 *   post:
 *     summary: Creates an order of a single itemID
 *     description: This sends an order to the customer which gives the order id and link
 *     tags:
 *       - PaymentController
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemID:
 *                 type: uuid
 *                 description: The ID of the category to which the item belongs.
 *                 example: "67faa63f12f175d8d624018c"
 *     responses:
 *       200:
 *         description: Bill Sent to client (They got to pay using the portal link)
 *       400:
 *         description: Bad Request - Invalid input
 *       500:
 *         description: Internal server error
 */
PaymentRouter.post("/create-order-single-item", async (req, res) => {
    
    const itemID = req.body.itemID;
    const quantity = 1;

    if (!itemID) {
        res.status(400).json({
            "error": "Missing Order Details",
        })
    }

    try{
        const response = await itemCategoriesController.getItemByID(itemID);
        
        /*********************** Making the bill section  ********************************/
        if (response.code==200) {
            const item = response.item; // _id, name, price, description, totalSold
            
            // Creating the paypal order here
            const accessToken = await generateAccessToken();

            const orderRequestBody = {
                intent: "CAPTURE",  // Capturing payment immediately
                purchase_units: [
                    {
                        amount: {
                            currency_code: "GBP", 
                            value: item.price.toFixed(2), // Item price
                        },
                        item_id: item._id,
                        item_name: item.name,
                        description: item.description,
                        quantity: quantity,
                    },
                ],
            };

            // Sending Order to be inialised on Paypal which i send the details to customer
            const orderResponse = await fetch(`${PAYPAL_URI}/v2/checkout/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(orderRequestBody),
            });

            // Failed to create an order, nothing to give to the customer to accept or decline
            if (!orderResponse.ok) {
                res.status(500).json({
                    "error": `${orderResponse.statusText}`},
                );
            }

            /*********************** Sending the bill section  ********************************/

            // Order has been initialised. Now the customer has to accept it and pay or decline it
            const orderData = await orderResponse.json();

            
            // This link is the portal to pay
            const approvalLink = orderData.links.find(link => link.rel === 'approve').href;

            // Sending the customer the bill
            res.json({
                orderID: orderData.id,
                approvalLink: approvalLink,  // Redirect Link to PayPal's Payment Portal
            });
        }
        else {
            res.status(response.code).json({
                "error": response.error,
            })
        }
    }
    catch {
        res.status(500).json({
            "error": "Server Failed Creating Order Completely"
        })
    }
    
})


PaymentRouter.post("/capture-single-item-order", (req, res) => {

})


export default PaymentRouter;