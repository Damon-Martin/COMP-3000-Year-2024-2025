import express from "express";


import OrderHistoryController from "../controllers/ordersHistoryController.js";
import OrderHistoryModel from "../models/order-history.js";

const OrderHistoryRouter = express.Router();

const orderHistoryController = new OrderHistoryController(OrderHistoryModel)


/**
 * @swagger
 * /v1/order-history/get-all-orders:
 *   get:
 *     summary: Retrieve all orders for the logged-in user
 *     description: Requires JWT token. Returns a list of all orders for the user identified by the token.
 *     tags:
 *       - OrderHistoryController
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
OrderHistoryRouter.get("/get-all-orders", async (req, res) => {
    let token = req.headers['authorization']; // with Bearer (Possibly)
    if (token?.startsWith('Bearer ')) {
        token = token.slice(7); // Remove 'Bearer ' prefix if present
    }

    const response = await orderHistoryController.getOrdersByToken(token)

    if (response.code == 200) {
        res.status(200).json({
            orderHistory: response.orderHistory
        });
    }
    else if (response.code && response.error) {
        res.status(response.code).json({
            error: response.error
        });
    }
    else {
        res.status(500).json({
            error: "Faild to retrieve order history completely"
        })
    }
})

/**
 * @swagger
 * /v1/order-history/get-transaction:
 *   get:
 *     summary: Retrieve a specific order by transaction ID
 *     description: Requires JWT token. Returns the order for the user identified by the token and transaction ID.
 *     tags:
 *       - OrderHistoryController
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: transactionID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the transaction/order to retrieve.
 *         example: "61a3faee2f6d4b3c80fbb3e6"
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *       400:
 *         description: Bad Request - Missing transactionID or token
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
OrderHistoryRouter.get("/get-transaction", async (req, res) => {
    let token = req.headers['authorization']; // with Bearer (Possibly)
    let transactionID = req.query.transactionID;
    
    if (token?.startsWith('Bearer ')) {
        token = token.slice(7); // Remove 'Bearer ' prefix if present
    }

    if (!transactionID) {
        return res.status(400).json({
            error: "Missing TransactionID"
        })
    }

    if (!token) {
        return res.status(400).json({
            error: "Missing Token"
        })
    }

    const response = await orderHistoryController.getOrderByTransactionID(transactionID, token)

    if (response.code == 200) {
        return res.status(200).json({
            order: response.order
        });
    }
    else if (response.code && response.error) {
        return res.status(response.code).json({
            error: response.error
        });
    }
    else {
        return res.status(500).json({
            error: "Faild to retrieve order history completely"
        })
    }
})


/**
 * @swagger
 * /v1/order-history/set-transaction-refunded:
 *   patch:
 *     summary: Mark an order as refunded
 *     description: Requires JWT token. Sets isRefunded to true for a given transaction ID.
 *     tags:
 *       - OrderHistoryController
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transactionID
 *             properties:
 *               transactionID:
 *                 type: string
 *                 description: The ID of the transaction to mark as refunded.
 *                 example: "61a3faee2f6d4b3c80fbb3e6"
 *     responses:
 *       200:
 *         description: Order marked as refunded
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
OrderHistoryRouter.patch("/set-transaction-refunded", async (req, res) => {
    let token = req.headers['authorization'];
    const { transactionID } = req.body;

    if (token?.startsWith('Bearer ')) {
        token = token.slice(7);
    }

    if (!transactionID) {
        return res.status(400).json({ error: "Missing transactionID in body" });
    }

    if (!token) {
        return res.status(400).json({ error: "Missing or invalid token" });
    }

    const response = await orderHistoryController.setRefundOnTransaction(transactionID, token);

    if (response.code === 200) {
        return res.status(200).json({ message: response.message });
    } 
    else {
        return res.status(response.code || 500).json({ error: response.error || "Unknown error" });
    }
});


/**
 * @swagger
 * /v1/order-history/remove-all-history:
 *   delete:
 *     summary: Deletes all order history for a user
 *     description: Requires JWT token. Deletes all order history associated with this user for GDPR Compliance during account deletion.
 *     tags:
 *       - OrderHistoryController
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order history deleted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
OrderHistoryRouter.delete("/remove-all-history", async (req, res) => {
    let token = req.headers['authorization'];

    if (token?.startsWith('Bearer ')) {
        token = token.slice(7);
    }

    if (!token) {
        return res.status(400).json({ error: "Missing or invalid token" });
    }

    try {
        const rawRes = await fetch(`${orderHistoryController.AuthURI}/v1/validateJWT`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
        });

        const data = await rawRes.json();

        if (rawRes.status === 200 && data.email) {
            const response = await orderHistoryController.removeAllOrderHistory(data.email);

            if (response.code === 200) {
                return res.status(200).json({ message: response.message });
            } 
            else {
                return res.status(500).json({ error: response.error });
            }
        } 
        else {
            return res.status(401).json({ error: "Invalid or expired token" });
        }
    } 
    catch (e) {
        return res.status(500).json({ error: "Internal error verifying token or deleting orders" });
    }
});


export default OrderHistoryRouter;