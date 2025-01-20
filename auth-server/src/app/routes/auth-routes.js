import express from 'express'
import AuthController from '../controllers/auth-controller.js';
import AuthModel from '../models/auth-model.js';

const AuthRouter = express.Router();

const authController = new AuthController(AuthModel);

AuthRouter.get("/register", async (req, res) => {
    const uName = req.body.username;
    const pass = req.body.password;
    // If there is a uName & pass (logic below)

    const result = await authController.register(uName, pass);

    if (result.code == 200) {
        res.status(result.code).json({
            msg: result.msg
        })
    }
    else {
        res.status(result.code).json({
            error: result.error
        })
    }
})

export default AuthRouter;