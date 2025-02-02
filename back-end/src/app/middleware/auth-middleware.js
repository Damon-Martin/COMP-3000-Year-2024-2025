import mongoose from "mongoose";

const AuthURI = String(process.env.REACT_APP_AUTH_SERVER_URI);

class AuthMiddleware {

    // Handles Disconect: Blocks all endpoints if the DB is down
    static restrictEndpointWithoutDB(req, res, next) {
        if (mongoose.connection.readyState === 0) {  // 0 means disconnected
        return res.status(500).json({ error: 'Lost Connection with MongoDB, please try again later' });
        }
        next();
    }

    static async checkIfAdmin(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).json({
                error: "Missing JWT from client for this endpoint"
            });
        }

        let token = req.headers.authorization;
        if (token.startsWith("Bearer ")) {
            token = token.replace("Bearer ", ""); // Remove 'Bearer ' prefix
        }

        try {
            const response = await fetch(`https://nginx-auth:4000/v1/validateJWT`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "token": token })
            });

            const data = await response.json();

            if (response.status != 200) {
                return res.status(response.status).json({
                    error: data.error
                });
            }

            // Now check if admin
            console.log(data);
            next();
        } 
        catch (e) {
            console.error(e)
            return res.status(500).json({
                error: "Failed to check JWT with Auth Server",
                exactError: e.message,
                uri: `${AuthURI}/v1/validateJWT`,
                token: token
            });
        }
    }
}

export default AuthMiddleware;