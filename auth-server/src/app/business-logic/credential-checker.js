
class CredentialChecker  {
    CheckRequestBody (username, pass) {
        if (!username && !pass) {
            return({
                code: 400,
                error: "You are missing the username & password"
            });
        }
        if (!username) {
            return({
                code: 400,
                error: "You are missing the username"
            });
        }
        if (!pass) {
            return ({
                code: 400,
                error: "You are missing the password"
            });
        }
        else {
            return ({
                code: 200
            });
        }
    }
}

export default CredentialChecker;