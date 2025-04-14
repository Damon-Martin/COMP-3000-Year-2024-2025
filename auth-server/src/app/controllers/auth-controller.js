import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import CredentialChecker from '../business-logic/credential-checker.js';

class AuthController {
    constructor(AuthModel, SessionModel, UserDetailsModel, AdminDetailsModel) {
        this.AuthModel = AuthModel;
        this.SessionModel = SessionModel;
        this.AdminDetailsModel = AdminDetailsModel;
        this.UserDetailsModel = UserDetailsModel;

        this.checker = new CredentialChecker();
    }

    // Returns JWT and Makes new Session
    async login(email, password) {
        try {
            // Validate input
            const checkerRes = this.checker.CheckRequestBody(email, password);
            if (checkerRes.code !== 200) {
                return {
                    code: 401,
                    error: "Username or Password is Missing",
                };
            }
    
            // Retrieve user from database
            const user = await this.AuthModel.findOne({ email: email });
            
            if (!user) {
                return {
                    code: 404,
                    error: "User does not Exist",
                };
            }
    
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {

                let token = jwt.sign({ userId: user._id,  timestamp: Date.now() }, 'Example-Secret-Key', {
                    expiresIn: '1h',
                });

                // Save Session to DB
                const sessionModel = new this.SessionModel({
                    userId: user._id,
                    token: token,
                    expiresAt: Date.now() + 3600 * 1000, // Token Expiration (1 hour)
                });

                sessionModel.save();

                // Check if the user is an admin
                const admin = await this.AdminDetailsModel.findOne({ email: email });

                if (!admin) {
                    return {
                        code: 200,
                        token: token,
                        email: email,
                        msg: "Login Successful",
                        admin: false
                    };
                }
                return {
                    code: 200,
                    token: token,
                    email: email,
                    msg: "Login Successful",
                    admin: true
                };

            } 
            else {
                return {
                    code: 401,
                    error: "Username or Password is Incorrect",
                };
            }
        } 
        catch (e) {
            console.error("Error during login:", e);
            return {
                code: 500,
                error: "An internal server error occurred",
            };
        }
    }
    

    // Returns JWT and Registers UName & Pass to DB
    // Checks if details is secure
    // For Customers Specifically
    async registerCustomer(email, password, userDetails) {
        try{
            const checkerRes = this.checker.CheckRequestBody(email, password);

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
                email: email,
                password: encryptPass
            })

            const currentDetails =  new this.UserDetailsModel({
                email: email,
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
                        email: email,
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
                    error: "User already Exists, try a new email"
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

    async registerAdmin(email, password, adminDetails) {
        try{
            const checkerRes = this.checker.CheckRequestBody(email, password);

            // Error handling
            if (checkerRes.code != 200) {
                return {
                    code: 401,
                    error: "Username or Password is Missing"
                }
            }

            if (adminDetails.fName == null || adminDetails.lName == null || adminDetails.NiNumber == null || adminDetails.tel == null || adminDetails.address == null || adminDetails.postcode == null) {
                return {
                    code: 401,
                    error: "Invalid User Details Provided"
                }
            }

            let encryptPass = await bcrypt.hash(password, 10)

            // Make New User
            const user = new this.AuthModel({
                email: email,
                password: encryptPass
            })

            const currentDetails =  new this.AdminDetailsModel({
                email: email,
                fName: adminDetails.fName,
                lName: adminDetails.lName,
                tel: adminDetails.tel,
                NiNumber: adminDetails.NiNumber,
                address: adminDetails.address,
                postcode: adminDetails.postcode
            })

            try {
                // Saving User
                await user.save();
                await currentDetails.save();

                let token = jwt.sign({ userId: user._id,  timestamp: Date.now() }, 'Example-Secret-Key', {
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
                        email: email,
                        msg: "Admin Registered Successfully"
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
                    error: "User already Exists, try a new email"
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
    async validateJWT(token) {
        try {
            const tokenInstance = await this.SessionModel.findOne({ token: token })

            if (!tokenInstance) {
                return {
                    code: 401,
                    error: "Token either does not exist or is expired"
                }
            }

            // get email
            const authInstance = await this.AuthModel.findOne({ _id: tokenInstance.userId })
            const uName = authInstance.email;

            // Check if admin
            const admin = await this.AdminDetailsModel.findOne({ email: uName });

            if (!admin){
                // Send email and admin status
                return {
                    code: 200,
                    msg: "Token has a session that is valid",
                    email: uName,
                    admin: false
                }
            }
            else {
                // Send email and admin status
                return {
                    code: 200,
                    msg: "Token has a session that is valid",
                    email: uName,
                    admin: true
                }
            }
            
        }
        catch(e) {
            console.error(e)
            return {
                code: 500,
                error: `Failed to connect to the DB, ${e}`
            }
            
        }
    }

    removeAllSessions(email) {}
}

export default AuthController;