import express from 'express'
import AuthController from '../controllers/auth-controller.js';

// DB Models
import AuthModel from '../models/auth-model.js';
import SessionModel from '../models/session-model.js'
import UserDetailModel from '../models/customer-detail-model.js';
import AdminDetailModel from '../models/admin-details-model.js';

const AuthRouter = express.Router();

const authController = new AuthController(AuthModel, SessionModel, UserDetailModel, AdminDetailModel);


/**
 * @swagger
 * /v1/register:
 *   post:
 *     summary: Registers user and sends a JWT to the User
 *     description: This will save a user login details to the database then return a JWT to the client. Passwords are salted and hashed.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Unique Username for the user
 *               password:
 *                 type: string
 *                 description: User's password (will be hashed before storing)
 *     responses:
 *       200:
 *         description: User registered successfully and JWT issued to client
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jwt:
 *                   type: string
 *                   description: JSON Web Token for authentication.
 *       409:
 *         description: Username already exists
 *       500:
 *         description: Server error
 */
AuthRouter.get("/register", async (req, res) => {
    const uName = req.body.username;
    const pass = req.body.password;
    const userDetails = req.body.userDetails;

    const result = await authController.registerCustomer(uName, pass, userDetails);

    if (result.code == 200) {
        res.status(result.code).json({
            token: result.token,
            msg: result.msg,
            admin: false
        })
    }
    else {
        res.status(result.code).json({
            error: result.error
        })
    }
})

AuthRouter.get("/registerAdmin", async (req, res) => {
    const uName = req.body.username;
    const pass = req.body.password;
    const adminDetails = req.body.adminDetails;

    const result = await authController.registerAdmin(uName, pass, adminDetails);

    if (result.code == 200) {
        res.status(result.code).json({
            token: result.token,
            msg: result.msg,
            admin: true
        })
    }
    else {
        res.status(result.code).json({
            error: result.error
        })
    }
})

export default AuthRouter;