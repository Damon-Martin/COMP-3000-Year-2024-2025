
class CredentialChecker  {
    CheckRequestBody (email, pass) {
        if (!email && !pass) {
            return({
                code: 400,
                error: "You are missing the email & password"
            });
        }
        if (!email) {
            return({
                code: 400,
                error: "You are missing the email"
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