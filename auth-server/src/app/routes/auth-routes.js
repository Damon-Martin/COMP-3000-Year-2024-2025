import express from 'express'

const AuthRouter = express.Router();

AuthRouter.get("/register", (req, res) => {
    res.send("/router endpoint");
})

export default AuthRouter;