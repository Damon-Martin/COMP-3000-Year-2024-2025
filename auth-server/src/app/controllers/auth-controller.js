import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import CredentialChecker from '../business-logic/credential-checker.js';

class AuthController {
    constructor(AuthModel, SessionModel) {
        this.AuthModel = AuthModel;
        this.SessionModel = SessionModel;
        this.checker = new CredentialChecker();
    }

    // Returns JWT and Makes new Session
    login(username, password) {
    }

    // Returns JWT and Registers UName & Pass to DB
    // For Customers Specifically
    async register(username, password) {
        try{
            const checkerRes = this.checker.CheckRequestBody(username, password);

            // Error handling
            if (checkerRes.code != 200) {
                return {
                    code: 401,
                    error: "Username or Password is Missing"
                }
            }

            let encryptPass = await bcrypt.hash(password, 10)

            // Make New User
            const user = new this.AuthModel({
                username: username,
                password: encryptPass
            })

            try {
                // Saving User
                await user.save();

                let token = jwt.sign({ userId: user._id }, 'Example-Secret-Key', {
                    expiresIn: '1h',
                });

                try {
                    const sessionModel = new this.SessionModel({
                        userId: user._id,
                        token: token,
                        expiresAt: Date.now() + 3600 * 1000, // Token Expiration (1 hour)
                    });
    
                    sessionModel.save();
    
                    return {
                        code: 200,
                        token: token,
                        msg: "Customer Registered Successfully"
                    }
                }
                catch(e) {
                    return {
                        code: 500,
                        error: `Username + Encrypted Password saved to db but failed creating a new session: ${e}`
                    }
                }

            }
            // User Already Exists
            catch(e) {
                return {
                    code: 409,
                    error: "User already Exists, try a new username"
                }
            }
            
        }
        catch(e) {
            console.error(e);
            return {
                code: 500,
                error: "Completly failed saving to the DB"
            }
        }
    }

    // Checking the Token and it's corresponding Session is Valid
    validateJWT(token) {}

    removeAllSessions(username) {}
}

export default AuthController;