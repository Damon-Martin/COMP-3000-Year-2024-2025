import CredentialChecker from '../business-logic/credential-checker.js';

class AuthController {
    constructor(AuthModel) {
        this.AuthModel = AuthModel;
        this.checker = new CredentialChecker();
    }

    login(username, password) {
    }

    async registerCustomer(username, password) {
        try{
            const checkerRes = this.checker.CheckRequestBody(username, password);

            // Error handling
            if (checkerRes.code != 200) {
                return {
                    code: 401,
                    error: "Username or Password is Missing"
                }
            }

            // Make New User
            const user = new this.AuthModel({
                username: username,
                password: password
            })

            try {
                // Saving User
                await user.save();

                return {
                    code: 200,
                    msg: "Customer Registered Successfully"
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

    async registerAdmin(username, password) {}

    validateJWT(token) {}

    removeAllSessions(username) {}
}

export default AuthController;