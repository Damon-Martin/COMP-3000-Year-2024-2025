import express from 'express'
import CredentialChecker from '../business-logic/credential-checker.js';

const AuthRouter = express.Router();
const checker = new CredentialChecker();

AuthRouter.get("/register", (req, res) => {
    const uName = req.body.username;
    const pass = req.body.password;

    const checkerRes = checker.CheckRequestBody(uName, pass);

    if (checkerRes.code != 200) {
        return (
            res.status(checkerRes.code).json({
                error: checkerRes.error
            })
        )
    }

    // If there is a uName & pass (logic below)

})

export default AuthRouter;