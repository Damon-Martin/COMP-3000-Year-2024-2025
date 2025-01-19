class AuthController {
    constructor(AuthModel) {
        this.AuthModel = AuthModel;
    }

    login(username, password) {
        try {
            const user = this.AuthModel.findOne(username);

            if (user.password == password) {
                return {
                    code: 200,
                }
            }
            return {
                code: 401,
                msg: "Username or Password Incorrect"
            }
        }
        catch {
            // Account does not exist
            return {
                code: 404,
                msg: "Username or Password Incorrect"
            }
        }
    }

    register(username, password) {}

    validateJWT(token) {}

    removeAllSessions(username) {}
}