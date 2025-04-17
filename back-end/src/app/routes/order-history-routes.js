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


export default OrderHistoryRouter;