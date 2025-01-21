import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import CredentialChecker from '../business-logic/credential-checker.js';

class AuthController {
    constructor(AuthModel, SessionModel, UserDetailsModel) {
        this.AuthModel = AuthModel;
        this.SessionModel = SessionModel;
        this.UserDetailsModel = UserDetailsModel;
        this.checker = new CredentialChecker();
    }

    // Returns JWT and Makes new Session
    login(username, password) {
    }

    // Returns JWT and Registers UName & Pass to DB
    // Checks if details is secure
    // For Customers Specifically
    async registerCustomer(username, password, userDetails) {
        try{
            const checkerRes = this.checker.CheckRequestBody(username, password);

            // Error handling
            if (checkerRes.code != 200) {
                return {
                    code: 401,
                    error: "Username or Password is Missing"
                }
            }

            if (userDetails.fName == null || userDetails.lName == null || userDetails.tel == null || userDetails.address == null || userDetails.postcode == null) {
                return {
                    code: 401,
                    error: "Invalid User Details Provided"
                }
            }

            let encryptPass = await bcrypt.hash(password, 10)

            // Make New User
            const user = new this.AuthModel({
                username: username,
                password: encryptPass
            })

            const currentDetails =  new this.UserDetailsModel({
                username: username,
                fName: userDetails.fName,
                lName: userDetails.lName,
                tel: userDetails.tel,
                address: userDetails.address,
                postcode: userDetails.postcode
            })

            try {
                // Saving User
                await user.save();
                await currentDetails.save();

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