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
 * /v1/payments/create-order:
 *   post:
 *     summary: Creates an order by sending a list of itemIDs
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
 *               itemIDs:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 description: List of item IDs to include in the order
 *                 example: ["67faa63f12f175d8d624018c", "67f6a1b7c02fe16921544ca8", 67f6a1b7c02fe16921544ca8]
 *             required:
 *               - itemIDs
 *     responses:
 *       200:
 *         description: Bill Sent to client (They got to pay using the portal link)
 *       400:
 *         description: Bad Request - Invalid input
 *       500:
 *         description: Internal server error
 */
PaymentRouter.post("/create-order", async (req, res) => {
    const { itemIDs } = req.body;

    if (!itemIDs || !Array.isArray(itemIDs) || itemIDs.length === 0) {
        return res.status(400).json({
            error: "Missing or invalid itemIDs in request body",
        });
    }

    try {
        const items = [];
        let total = 0.00;

        for (const itemID of itemIDs) {
            const response = await itemCategoriesController.getItemByID(itemID);

            if (response.code !== 200) {
                return res.status(response.code).json({
                    error: `Item not found or invalid: ${itemID}`,
                    details: response.error,
                });
            }

            const item = response.item;
            total += item.price;

            items.push({
                name: item.name,
                description: item.description,
                unit_amount: {
                    currency_code: "GBP",
                    value: item.price.toFixed(2),
                },
                quantity: "1"
            });
        }

        const purchaseUnits = [{
            amount: {
                currency_code: "GBP",
                value: total.toFixed(2),
                breakdown: {
                    item_total: {
                        currency_code: "GBP",
                        value: total.toFixed(2)
                    }
                }
            },
            items
        }];

        const accessToken = await generateAccessToken();

        const orderRequestBody = {
            intent: "CAPTURE",
            purchase_units: purchaseUnits,
        };

        const orderResponse = await fetch(`${PAYPAL_URI}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(orderRequestBody),
        });

        if (!orderResponse.ok) {
            return res.status(500).json({
                error: `${orderResponse.statusText}`,
                orderRequestBody: orderRequestBody
            });
        }

        const orderData = await orderResponse.json();
        const approvalLink = orderData.links.find(link => link.rel === 'approve')?.href;

        return res.json({
            orderID: orderData.id,
            approvalLink: approvalLink,
        });
    } 
    catch (err) {
        console.error("Create Order Error:", err);
        return res.status(500).json({
            error: "Server Failed Creating Order Completely",
        });
    }
});



/**
 * @swagger
 * /v1/payments/capture-order:
 *   post:
 *     summary: Captures order once user pays
 *     description: Checks if user pays and if they do, saves the order to the database and tells the user it was ok
 *     tags:
 *       - ItemController
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderID:
 *                 type: string
 *                 description: The PayPal order ID to capture
 *                 example: 5O190127TN364715T
 *     responses:
 *       200:
 *         description: Payment captured successfully
 *       400:
 *         description: Missing or invalid order ID, or payment not completed
 *       500:
 *         description: Internal server error while capturing payment
 */
PaymentRouter.post("/capture-order", async (req, res) => {
    const { orderID } = req.body;

    if (!orderID) {
        return res.status(400).json({ error: "Missing orderID in request body" });
    }

    try {
        // Get PayPal access token
        const accessToken = await generateAccessToken();

        // Capture the PayPal order
        const captureResponse = await fetch(`${PAYPAL_URI}/v2/checkout/orders/${orderID}/capture`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
        });

        if (!captureResponse.ok) {
            const errorData = await captureResponse.json();
            console.error("Error from PayPal:", errorData);
            return res.status(500).json({ error: "Failed to capture order", details: errorData });
        }

        const captureData = await captureResponse.json();

        // User has paid successfully
        if (captureData.status === "COMPLETED") {
            const capture = captureData.purchase_units[0].payments.captures[0];

            return res.json({
                success: true,
                message: "Payment captured successfully",
                transactionID: capture.id,
                amount: capture.amount,
                payer: captureData.payment_source?.paypal?.email_address,
                fullCaptureData: captureData,
            });
        } 
        // Payment failed
        else {
            return res.status(400).json({
                success: false,
                message: `Payment not completed. Status: ${captureData.status}`,
                fullCaptureData: captureData,
            });
        }
    } 
    catch (e) {
        console.error("Capture error:", e);
        return res.status(500).json({
            error: "Server error while capturing payment",
        });
    }
});



export default PaymentRouter;