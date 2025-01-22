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
 *     summary: Registers a Customer and sends a JWT to the User
 *     description: This will save a user login details to the database, along with user details, then return a JWT to the client. Passwords are salted and hashed.
 *     tags:
 *       - AuthController
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Unique Username for the customer
 *               password:
 *                 type: string
 *                 description: Customer's password (will be hashed before storing)
 *               userDetails:
 *                 type: object
 *                 description: This is another CRUD entity for user details nested in the request
 *                 properties:
 *                   fName:
 *                     type: string
 *                     description: First name of the customer
 *                   lName:
 *                     type: string
 *                     description: Last name of the customer
 *                   tel:
 *                     type: string
 *                     description: Telephone number of the customer
 *                   address:
 *                     type: string
 *                     description: Address of the customer
 *                   postcode:
 *                     type: string
 *                     description: Postcode of the customer's address
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
AuthRouter.post("/register", async (req, res) => {
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

/**
 * @swagger
 * /v1/login:
 *   post:
 *     summary: Login a user and send user a JWT
 *     description: Authenticates the user and provides a JWT upon successful login.
 *     tags:
 *       - AuthController
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username.
 *               password:
 *                 type: string
 *                 description: User's password.
 *     responses:
 *       200:
 *         description: Login successful and JWT issued.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jwt:
 *                   type: string
 *                   description: JSON Web Token for authentication.
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Server error.
 */
AuthRouter.post("/login", async (req, res) => {
    const uName = req.body.username;
    const pass = req.body.password;

    const result = await authController.login(uName, pass);

    if (result.code == 200) {
        res.status(result.code).json({
            token: result.token,
            msg: result.msg,
            admin: result.admin
        })
    }
    else {
        res.status(result.code).json({
            error: result.error
        })
    }
})

/**
 * @swagger
 * /v1/registerAdmin:
 *   post:
 *     summary: Registers an Admin and sends a JWT to the Admin
 *     description: This will save an admin’s login details to the database, along with admin details, then return a JWT to the client. Passwords are salted and hashed.
 *     tags:
 *       - AuthController
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Unique Username for the admin
 *               password:
 *                 type: string
 *                 description: Admin's password (will be hashed before storing)
 *               adminDetails:
 *                 type: object
 *                 description: Additional details for the admin
 *                 properties:
 *                   fName:
 *                     type: string
 *                     description: First name of the admin
 *                   lName:
 *                     type: string
 *                     description: Last name of the admin
 *                   tel:
 *                     type: string
 *                     description: Telephone number of the admin
 *                   NiNumber:
 *                     type: string
 *                     description: National Insurance number of the admin
 *                   address:
 *                     type: string
 *                     description: Address of the admin
 *                   postcode:
 *                     type: string
 *                     description: Postcode of the admin's address
 *     responses:
 *       200:
 *         description: Admin registered successfully and JWT issued to client
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
AuthRouter.post("/registerAdmin", async (req, res) => {
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

/**
 * @swagger
 * /v1/validateJWT:
 *   post:
 *     summary: Validates JWT
 *     description: The user sends a JWT to the backend. The back-end validates the JWT with this end-point.
 *     tags:
 *       - AuthController 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The JWT to validate.
 *     responses:
 *       200:
 *         description: Token is valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   description: Indicates whether the token is valid.
 *                 user:
 *                   type: object
 *                   description: The user information extracted from the token.
 *       401:
 *         description: Invalid or expired token.
 *       500:
 *         description: Server error.
 */
AuthRouter.post("/validateJWT", async (req, res) => {
    const token = req.body.token;

    const result = await authController.validateJWT(token);

    if (result.code == 200) {
        res.status(result.code).json({
            token: result.token,
            username: result.username,
            admin: result.admin,
            msg: result.msg,
        })
    }
    else {
        res.status(result.code).json({
            error: result.error
        })
    }
})

export default AuthRouter;