import CredentialChecker from '../business-logic/credential-checker.js';

class AuthController {
    constructor(AuthModel) {
        this.AuthModel = AuthModel;
        this.checker = new CredentialChecker();
    }

    login(username, password) {
        try {
            const checkerRes = this.checker.CheckRequestBody(username, password);

            if (checkerRes.code != 200) {
                return {
                    code: 401,
                    error: "Username or Password is Missing"
                }
            }

            const user = this.AuthModel.findOne(username);


            if (user.password == password) {
                return {
                    code: 200,
                }
            }
            return {
                code: 401,
                error: "Username or Password Incorrect"
            }
        }
        catch {
            // Account does not exist
            return {
                code: 404,
                error: "Username or Password Incorrect"
            }
        }
    }

    async register(username, password) {
        try{
            const user = new this.AuthModel({
                username: username,
                password: password
            })
            await user.save();

            return {
                code: 200,
                msg: "Customer Registered Successfully"
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

    validateJWT(token) {}

    removeAllSessions(username) {}
}

export default AuthController;