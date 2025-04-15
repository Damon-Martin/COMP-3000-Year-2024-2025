import express from "express";

import ItemsModel from "../models/items.js";
import CategoriesModel from "../models/categories.js";
import ItemCategoriesController from "../controllers/ItemCategoriesController.js";
import OrderHistoryController from "../controllers/ordersHistoryController.js";
import OrderHistoryModel from "../models/order-history.js";


const isProd = process.env.NEXT_PUBLIC_PRODUCTION === 'true';
const AppURL = isProd 
    ? process.env.NEXT_PUBLIC_URL_PROD 
    : process.env.NEXT_PUBLIC_URL;

const CLIENT_ID = String(process.env.NEXT_PUBLIC_PAYPAL_SANDBOX_CLIENT_ID);
const CLIENT_SECRET = String(process.env.PAYPAL_SANDBOX_SECRET);
const PAYPAL_URI = 'https://api-m.sandbox.paypal.com';

const itemCategoriesController = new ItemCategoriesController(CategoriesModel, ItemsModel);
const orderHistoryController = new OrderHistoryController(OrderHistoryModel);

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
 *     summary: Creates an order by sending a list of itemIDs and a username
 *     description: This sends an order to the customer which gives the order id and approval link. The username is used as a custom identifier for the order.
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
 *                 example: ["67faa63f12f175d8d624018c", "67f6a1b7c02fe16921544ca8"]
 *               username:
 *                 type: string
 *                 description: The username email of the customer. Customers can have diff email for paypal and app.
 *                 example: "example@email.com"
 *             required:
 *               - itemIDs
 *               - username
 *     responses:
 *       200:
 *         description: Bill Sent to client (They got to pay using the portal link)
 *       400:
 *         description: Bad Request - Invalid input, missing itemIDs or username
 *       500:
 *         description: Internal server error
 */
PaymentRouter.post("/create-order", async (req, res) => {
    const { itemIDs, username } = req.body;  // Accept username along with itemIDs

    if (!itemIDs || !Array.isArray(itemIDs) || itemIDs.length === 0) {
        return res.status(400).json({
            error: "Missing or invalid itemIDs in request body",
        });
    }

    // Checking if username email is provided and is valid
    if (!username || typeof username !== 'string' || username.trim() === '') {
        return res.status(400).json({
            error: "Missing or invalid username",
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
            items,
            custom_id: username,
        }];

        // Generating the access token for PayPal API
        const accessToken = await generateAccessToken();

        const returnUrl = `${AppURL}/item/purchase-result`;  // Success URL
        const cancelUrl = `${AppURL}`; // Cancel URL

        // Building the order request body with return_url and cancel_url
        const orderRequestBody = {
            intent: "CAPTURE",
            purchase_units: purchaseUnits,
            application_context: {
                return_url: returnUrl,
                cancel_url: cancelUrl
            }
        };

        // Creating the order with the PayPal API
        const orderResponse = await fetch(`${PAYPAL_URI}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(orderRequestBody),
        });

        // Handling error if the order creation fails
        if (!orderResponse.ok) {
            return res.status(500).json({
                error: `${orderResponse.statusText}`,
                orderRequestBody: orderRequestBody
            });
        }

        // Getting the approval link from the order response
        // This is the payment portal
        const orderData = await orderResponse.json();
        const approvalLink = orderData.links.find(link => link.rel === 'approve')?.href;

        // Send the order ID and approval link back to the client
        return res.json({
            orderID: orderData.id,
            approvalLink: approvalLink,
        });
    } 
    catch (e) {
        console.error("Create Order Error:", e);
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
 *       - PaymentController
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
        // Geting PayPal access token
        const accessToken = await generateAccessToken();

        // Capturing the PayPal order
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

            // Fetching order details
            const orderDetailsResponse = await fetch(`${PAYPAL_URI}/v2/checkout/orders/${orderID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            // Handling payment failure
            if (!orderDetailsResponse.ok) {
                const errorDetails = await orderDetailsResponse.json();
                console.error("Error fetching order details:", errorDetails);
                return res.status(500).json({
                    error: "Error retrieving order details for custom_id",
                    details: errorDetails
                });
            }


            /******************* Saving to successful order to db section **********************/
            const orderDetails = await orderDetailsResponse.json(); // We can send this optionally (very large)
            
            const transactionID = capture.id; // Transaction ID is for refunds
            const totalAmount = capture.amount;
            const email = orderDetails.purchase_units[0].custom_id;
            const payerEmail = captureData.payment_source?.paypal?.email_address;
            const items = orderDetails.purchase_units[0].items;
            


            // This gives a status code
            // Saving Order to order history
            const rawRes = await orderHistoryController.addOrderDetailsDB(transactionID, totalAmount, email, payerEmail, items);
            console.log(rawRes)
            
            /******************* Success: Givng details to customer **********************/
            if (rawRes.code == 200) {
                
                // Sending response with payment details and username
                return res.status(200).json({
                    transactionID: transactionID,
                    success: true,
                    message: "Payment captured successfully",
                    amount: totalAmount,
                    payer: payerEmail,
                    username: email,  // customers username email
                    items: items
                });
            }
            // Failed saving to DB, Perform Refund Immediately
            else {


                return res.status(500).json({
                    transactionID: transactionID,
                    msg: "Failed to save to the database",
                    error: rawRes.error
                });
            }
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