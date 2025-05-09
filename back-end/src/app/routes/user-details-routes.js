import express from "express";
import AuthMiddleware from "../middleware/auth-middleware.js";
import UserDetailsController from "../controllers/CustomerDetailsController.js";
import UserDetailModel from "../models/customer-detail-model.js";
import BasketModel from "../models/basket.js";
import OrderHistoryModel from "../models/order-history.js";
import AuthModel from "../models/auth-model.js";
import CategoriesModel from "../models/categories.js";
import ItemsModel from "../models/items.js";

const UserDetailsRouter = express.Router();


// Inserting models into the controller
const userDetailsController = new UserDetailsController(
    UserDetailModel,
    BasketModel,
    OrderHistoryModel,
    AuthModel
);

/**
 * @swagger
 * /v1/user-details:
 *   get:
 *     summary: Retrieving the User Details by email
 *     tags:
 *       - UserDetailsController
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email of the user
 *     responses:
 *       200:
 *         description: User details fetched successfully
 *       400:
 *         description: Missing email parameter
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
UserDetailsRouter.get("/", AuthMiddleware.checkIfLoggedIn, async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: "Email is required." });
    }

    try {
        const response = await userDetailsController.getUserDetailsByEmail(email);
        res.status(response.code).json(response.code === 200 ? { user: response.user } : { error: response.error });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

/**
 * @swagger
 * /v1/user-details:
 *   patch:
 *     summary: Update user details by email
 *     tags:
 *       - UserDetailsController
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Current Email of the user to Update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fName:
 *                 type: string
 *               lName:
 *                 type: string
 *               tel:
 *                 type: string
 *               address:
 *                 type: string
 *               postcode:
 *                 type: string
 *               newEmail:
 *                 type: string
 *                 description: New email to update across user and auth models (optional too)
 *             example:
 *               fName: "John"
 *               lName: "Doe"
 *               tel: "07857444758"
 *               address: "456 New Road"
 *               postcode: "AB1 2CD"
 *               newEmail: "john.doe@example.com"
 *     responses:
 *       200:
 *         description: User details updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id: { type: string }
 *                     email: { type: string }
 *                     fName: { type: string }
 *                     lName: { type: string }
 *                     tel: { type: string }
 *                     address: { type: string }
 *                     postcode: { type: string }
 *       400:
 *         description: Missing email or update data, or email already taken
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
UserDetailsRouter.patch("/", AuthMiddleware.checkIfLoggedIn, async (req, res) => {
    const { email } = req.query;
    const updateData = req.body;

    if (!email || !updateData) {
        return res.status(400).json({ error: "Email and update data are required." });
    }

    try {
        const response = await userDetailsController.updateUserDetailsByEmail(email, updateData);
        res.status(response.code).json(response.code === 200 ? { msg: response.msg, user: response.user } : { error: response.error });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

/**
 * @swagger
 * /v1/user-details:
 *   delete:
 *     summary: Deleting the user by email including their orders and basket
 *     tags:
 *       - UserDetailsController
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Missing email
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
UserDetailsRouter.delete("/", AuthMiddleware.checkIfLoggedIn, async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: "Email is required." });
    }

    try {
        const response = await userDetailsController.deleteUserDetailsByEmail(email);
        res.status(response.code).json(response.code === 200 ? { msg: response.msg, user: response.user } : { error: response.error });
    } 
    catch (e) {
        res.status(500).json({ error: `Server error: ${e}` });
    }
});

export default UserDetailsRouter;
