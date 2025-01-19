class AuthController {
    constructor(AuthModel) {
        this.AuthModel = AuthModel;
    }

    login(username, password) {}

    register(username, password) {}

    validateJWT(token) {}

    removeAllSessions(username) {}
}