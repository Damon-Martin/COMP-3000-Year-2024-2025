import express from 'express'
import AuthController from '../controllers/auth-controller.js';
import authModel from '../models/auth-model.js';

const AuthRouter = express.Router();

const authController = new AuthController();

AuthRouter.get("/register", (req, res) => {
    const uName = req.body.username;
    const pass = req.body.password;
    // If there is a uName & pass (logic below)

    res.send(uName);
})

export default AuthRouter;