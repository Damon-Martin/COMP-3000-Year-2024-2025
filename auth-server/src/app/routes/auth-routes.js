import express from 'express'

const AuthRouter = express.Router();

AuthRouter.get("/register", (req, res) => {
    const username = req.body.username;
    const pass = req.body.password;

    if (!username && !pass) {
        return(
            res.status(400).json({
                error: "You are missing the username & password"
            })
        );
    }
    if (!username) {
        return(
            res.status(400).json({
                error: "You are missing the username"
            })
        )
    }
    if (!pass) {
        return(
            res.status(400).json({
                error: "You are missing the password"
            })
        )
    }

    res.status(200).json({
        msg: "Saved user to db"
    })
})

export default AuthRouter;